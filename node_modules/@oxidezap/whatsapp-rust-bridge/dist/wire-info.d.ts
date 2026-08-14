/**
 * Packed wire-batch codecs (message metadata, receipts, server acks).
 *
 * The bridge crosses hot per-event metadata as fixed-width numeric records
 * plus a string table that outlives the batch: repeated addresses, push names
 * and ack classes are materialized once per process and referenced by index
 * afterwards, instead of one FFI object build per event. This module is the
 * single host-side owner of every record layout; the Rust writers live in
 * `src/wire_batch.rs`.
 *
 * A table that outlives a batch only works while both sides agree on when it
 * is dropped, so every codec here speaks one invalidation protocol: the writer
 * sets `PACKED_FLAG_RESET_CACHES` in a batch's header and the reader clears
 * before reading it. That makes every decoder here **stateful**. Decode each
 * batch exactly once, in the order the bridge delivered it; a batch decoded
 * twice, out of order, or not at all leaves the table describing a history the
 * records do not have.
 */
/** Serde shape of the core's `Jid` as carried by bridge events. */
export interface WireJid {
    user: string;
    server: string;
    agent: number;
    device: number;
    integrator: number;
}
/** Decoded per-message metadata envelope. */
export interface MessageWireInfo {
    /** Canonical device-independent chat address. */
    chat: string;
    /** Canonical device-independent author address. */
    sender: string;
    senderAlt?: string;
    recipientAlt?: string;
    isFromMe: boolean;
    isGroup: boolean;
    id: string;
    /** Unix timestamp in seconds. */
    timestamp: number;
    pushName: string;
    isViewOnce: boolean;
    isOffline: boolean;
    unavailableRequestId?: string;
    /** Raw protocol edit attribute; absent when the attribute was empty. */
    edit?: string;
}
export declare const MESSAGE_WIRE_INFO_RECORD_WIDTH = 10;
/** Decoded message batch: payload slices plus one envelope per message. */
export interface MessageWireBatchView {
    /** Concatenated `proto.Message` payloads, in event order. */
    messageData: Uint8Array;
    /** N + 1 byte offsets delimiting the N payloads in `messageData`. */
    messageOffsets: Uint32Array;
    /** One decoded envelope per message, parallel to the payload offsets. */
    infos: MessageWireInfo[];
}
/** Decode a packed message batch into payload slices and metadata envelopes. */
export declare function decodeMessageWireBatch(batch: PackedWireBatch): MessageWireBatchView;
/** One message as a caller supplies it to `encodeMessageWireBatch`. */
export interface MessageWireEntry {
    /** Encoded `proto.Message` payload. */
    payload: Uint8Array;
    info: MessageWireInfo;
}
/**
 * Build-side mirror of the Rust `MessageWireBatch`, for hosts that need to
 * fabricate batches (tests, replay tooling).
 *
 * One encoder is one writer: it keeps the table across `encode` calls exactly
 * as the bridge's does, so a run of batches decodes the way a run from the
 * bridge decodes — later batches defining nothing and indexing what earlier
 * ones defined. Its first batch always asks the reader to clear, so a run
 * starts from a table it owns rather than one someone else left behind.
 *
 * Deliberately not re-exported from the package root. There is one standing
 * table per realm, so a second live run has nowhere of its own to decode
 * against: its reset batch would take the first run's entries with it. That
 * makes this safe for a test or a replay that owns the process and unsafe as
 * a public API. Hosts get `encodeMessageWireBatch`, whose batches are
 * self-contained.
 */
export declare class MessageWireBatchEncoder {
    private readonly cache;
    /** Entries the reader holds, and so the index the next definition takes. */
    private held;
    private cacheBytes;
    private flags;
    /**
     * Encode one batch, as `MessageWireBatch::write_flat` writes one.
     *
     * A throw part-way leaves the encoder holding cache entries whose definitions
     * were never written, so it gives the whole table up rather than hand the
     * next batch indices the reader has no entries for — the same thing the Rust
     * writer does with a batch it abandons.
     */
    encode(entries: readonly MessageWireEntry[]): PackedWireBatch;
    private encodeBatch;
}
/**
 * Inverse of `decodeMessageWireBatch` for a single standalone batch: it carries
 * its own table definitions and asks the reader to clear, so it decodes the
 * same whatever ran before it. Use `MessageWireBatchEncoder` to fabricate a run
 * of batches that share a table the way the bridge's do.
 */
export declare function encodeMessageWireBatch(entries: readonly MessageWireEntry[]): PackedWireBatch;
/**
 * A packed batch IS its buffer: one flat run of header, cache definitions,
 * fixed-width records and string bytes. See the Rust writers in
 * `src/wire_batch.rs`.
 *
 * Crossing the bare typed array rather than a `{ buffer }` object saves an
 * object construction and a property write per batch, and a single message
 * produces three batches (its own, its receipt, its ack).
 */
export type PackedWireBatch = Uint8Array;
/** Serde shape of the core's `Receipt` payload, as the single-event path emits it. */
export interface ReceiptWireData {
    source: {
        chat: WireJid;
        sender: WireJid;
        is_from_me: boolean;
        is_group: boolean;
        addressing_mode?: string;
        sender_alt?: WireJid;
        recipient_alt?: WireJid;
        broadcast_list_owner?: WireJid;
        recipient?: WireJid;
    };
    message_ids: string[];
    /** Unix timestamp in seconds. */
    timestamp: number;
    /** Variant name, or `{ Other: value }` for unrecognized wire values. */
    type: string | {
        Other: string;
    };
    offline: boolean;
}
/** Serde shape of the core's `ServerAck` payload. */
export interface ServerAckWireData {
    id: string;
    class?: string;
    from?: WireJid;
    /** Unix timestamp in seconds. */
    timestamp?: number;
    error?: string;
}
export declare function decodeReceiptWireBatch(batch: PackedWireBatch): ReceiptWireData[];
export declare function decodeServerAckWireBatch(batch: PackedWireBatch): ServerAckWireData[];
/** Inverse of `decodeReceiptWireBatch`, for tests and replay tooling. */
export declare function encodeReceiptWireBatch(receipts: readonly ReceiptWireData[]): PackedWireBatch;
/** Inverse of `decodeServerAckWireBatch`, for tests and replay tooling. */
export declare function encodeServerAckWireBatch(acks: readonly ServerAckWireData[]): PackedWireBatch;
/** Segment tags, mirroring the Rust writer in `src/wire_batch.rs`. */
export declare const EVENT_SEGMENT_KIND_MESSAGE = 1;
export declare const EVENT_SEGMENT_KIND_RECEIPT = 2;
export declare const EVENT_SEGMENT_KIND_SERVER_ACK = 3;
/** One packed batch inside an envelope. */
export interface EventWireSegment {
    /** One of the `EVENT_SEGMENT_KIND_*` tags; names the codec for `batch`. */
    kind: number;
    /** Exactly the bytes the segment's own callback would have received. */
    batch: PackedWireBatch;
}
/**
 * Split an envelope into its segments, in the order the events arrived. Decode
 * each with the codec its kind names and deliver them in that order.
 */
export declare function decodeEventWireEnvelope(envelope: Uint8Array): EventWireSegment[];
/** Inverse of `decodeEventWireEnvelope`, for tests and replay tooling. */
export declare function encodeEventWireEnvelope(segments: readonly EventWireSegment[]): Uint8Array;
