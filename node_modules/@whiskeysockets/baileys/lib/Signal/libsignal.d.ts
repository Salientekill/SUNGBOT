import type { LIDMapping, SignalAuthState } from '../Types';
import type { SignalRepositoryWithLIDStore } from '../Types/Signal';
import type { ILogger } from '../Utils/logger';
export declare function makeLibSignalRepository(auth: SignalAuthState, logger: ILogger, pnToLIDFunc?: (jids: string[]) => Promise<LIDMapping[] | undefined>): SignalRepositoryWithLIDStore;
//# sourceMappingURL=libsignal.d.ts.map