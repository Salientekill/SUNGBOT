import { UnpairedSurrogateError } from "./proto-reader";
export { UnpairedSurrogateError };
/**
 * Encode `obj` as `typeName`.
 *
 * A numeric field takes a `number`, a `bigint`, a `Long` — the `{ low, high,
 * unsigned }` shape `decodeProto` hands back for a 64-bit value past 2^53, so a
 * decoded message re-encodes unchanged — or a string that parses in full as a
 * number. Never `''`, `true`, `[]` or anything else JavaScript would silently
 * turn into a number, and the value must be one the declared type can hold;
 * anything else throws `invalid <type>: <value>`. To leave a field unset, omit
 * it or pass `undefined`/`null`; `''` is not a zero.
 * See `docs/proto-numeric-input.md` for the per-type matrix.
 */
export declare function encodeProto(typeName: string, obj: unknown): Uint8Array;
/**
 * Opt-in account of what a decode had to change to hand back JavaScript
 * strings. Requesting one turns the check on; without it the decode path is
 * untouched.
 */
export interface ProtoDecodeReport {
    /** `string` fields whose wire bytes were not valid UTF-8 and got U+FFFD instead. */
    invalidUtf8Fields: number;
}
export declare function decodeProto(typeName: string, data: Uint8Array, report?: ProtoDecodeReport): unknown;
/**
 * Decode concatenated protobuf payloads with one reader and no per-entry
 * `Uint8Array.subarray()`. `offsets` must contain N + 1 monotonic positions,
 * starting at zero and ending at `data.length`.
 */
export declare function decodeProtoBatch(typeName: string, data: Uint8Array, offsets: Uint32Array, report?: ProtoDecodeReport): unknown[];
