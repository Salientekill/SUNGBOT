/**
 * One unit of locking — a (namespace, id) pair. The `namespace` is usually a
 * {@link SignalDataType} when locking a real record, but the lock manager also
 * accepts internal-use namespaces (e.g. `'__type__'` for per-type batched
 * writes, `'__legacy__'` for backwards compatibility with the string-keyed
 * `transaction(work, key)` API). Internal namespaces are deliberately prefixed
 * to avoid collision with `SignalDataType` values.
 */
export type LockRef = {
    namespace: string;
    id: string;
};
export type LockManager = {
    /** Run `work` while holding the lock on a single ref. */
    withLock<T>(ref: LockRef, work: () => Promise<T> | T): Promise<T>;
    /**
     * Run `work` while holding locks on every ref in `refs`. Locks are acquired
     * in a deterministic order (sorted by `namespace\0id`) so two callers asking
     * for an overlapping set never deadlock against each other. Duplicate refs
     * are coalesced — passing the same ref twice acquires the lock once.
     */
    withLocks<T>(refs: readonly LockRef[], work: () => Promise<T> | T): Promise<T>;
    /**
     * For diagnostics / tests: true if any work is currently holding a lock on
     * the given ref. Not for production decision-making — it races with the lock
     * acquisition path itself.
     */
    isLocked(ref: LockRef): boolean;
};
/**
 * Build a {@link LockManager} on top of the existing {@link makeKeyedMutex}
 * primitive (which already implements correct identity-checked refcount
 * cleanup at `src/Utils/make-mutex.ts:34`). This module is the canonical
 * lock-acquisition surface for the auth/transaction layer — no other module
 * should instantiate per-key mutexes or `PQueue` maps directly.
 */
export declare const makeLockManager: () => LockManager;
//# sourceMappingURL=lock-manager.d.ts.map