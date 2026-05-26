import type { AuthenticationState, SignalDataTypeMap } from '../Types/index.js';
import type { ILogger } from './logger.js';
/**
 * Result of a {@link migrateAuthState} run.
 *
 * `counts` maps each `SignalDataType` to the number of records copied. The
 * `verified` flag is `true` when post-migration id sets match between source
 * and destination.
 */
export type MigrateAuthStateResult = {
    creds: {
        copied: boolean;
    };
    counts: Partial<Record<keyof SignalDataTypeMap, number>>;
    verified: boolean;
    warnings: string[];
};
export type MigrateAuthStateOptions = {
    from: AuthenticationState;
    to: AuthenticationState;
    /** Maximum records buffered between a `list` pull and a `set` push. Defaults to 100. */
    batchSize?: number;
    /**
     * If true, the destination store is consulted to detect already-migrated
     * records — they're skipped rather than re-written. Lets a partially
     * failed run resume safely. Defaults to true.
     */
    skipExisting?: boolean;
    logger?: ILogger;
    /**
     * When `true`, after copying every type the migrator enumerates the source
     * AND the destination to verify the id sets match. Adds a full extra pass
     * over the source. Defaults to true. The result's `verified` flag reflects
     * the outcome — set this to `false` for very large stores where the verify
     * pass is too expensive.
     */
    verify?: boolean;
};
/**
 * Copy a full authentication state (creds + every signal key record) from one
 * {@link AuthenticationState} to another. Used to migrate operators from
 * `useMultiFileAuthState` (deprecated) to a SQL-backed or other compliant
 * adapter without re-pairing the device.
 *
 * Requirements:
 * - The `from.keys` store MUST implement `list(type)` (added by Stage 1's type
 *   lift). Without it the migrator cannot enumerate records.
 * - The destination's `set(data)` MUST be at least per-call atomic for the
 *   pairs of types it observes. Crashes between batches leave a partial state
 *   on the destination; re-running with the default `skipExisting: true`
 *   safely resumes (writes are upserts; existing ids are skipped).
 *
 * Operational notes:
 * - The source is never mutated.
 * - Listing reads bypass the cache layer (see
 *   `makeCacheableSignalKeyStore.list`) so we always observe the durable
 *   content of the source.
 * - Logs `info` per type with counts; `warn` for any verification mismatch.
 */
export declare function migrateAuthState({ from, to, batchSize, skipExisting, logger, verify }: MigrateAuthStateOptions): Promise<MigrateAuthStateResult>;
//# sourceMappingURL=migrate-auth-state.d.ts.map