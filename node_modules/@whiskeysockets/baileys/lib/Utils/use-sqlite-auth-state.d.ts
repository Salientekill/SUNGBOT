import type BetterSqlite3Module from 'better-sqlite3';
import type { AuthenticationState } from '../Types/index.js';
/** A live `better-sqlite3` database handle (the instance type, not the constructor). */
type Database = BetterSqlite3Module.Database;
type SqliteAuthStateOptions = {
    /**
     * Filesystem path to the SQLite database file. The file will be created if
     * it does not exist. Use `':memory:'` for an in-process ephemeral store
     * (useful in tests).
     */
    dbPath: string;
    /**
     * If supplied, overrides the default `better-sqlite3` import — primarily
     * for tests / advanced consumers that want to inject a pre-opened
     * `Database` handle.
     */
    database?: Database;
};
/**
 * SQLite-backed authentication state for Baileys.
 *
 * Why this and not `useMultiFileAuthState`?
 *   - cross-process safe (SQLite handles file locking);
 *   - true per-call atomicity via `BEGIN IMMEDIATE; …; COMMIT` — a multi-type
 *     `set({ session, 'identity-key' })` either commits both types or rolls
 *     back the whole call (closes the cross-file H3/H5 gap that the multi-file
 *     adapter can only approximate);
 *   - constant-time point reads under arbitrarily large state;
 *   - efficient `list`/`listIds` enumeration for bulk operations and migration.
 *
 * Lifecycle:
 *   - the returned `close()` closes the underlying SQLite handle.
 *   - The same `dbPath` can be reopened after `close()` to resume.
 *
 * For migrating an existing on-disk `useMultiFileAuthState` folder to this
 * store, see {@link migrateAuthState}.
 */
export declare function useSqliteAuthState(opts: SqliteAuthStateOptions): Promise<{
    state: AuthenticationState;
    saveCreds: () => Promise<void>;
    close: () => void;
}>;
export {};
//# sourceMappingURL=use-sqlite-auth-state.d.ts.map