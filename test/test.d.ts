import 'babel-polyfill';
import { TAME } from '../tame';
export declare class AdsWebService {
    url: string;
    amsNetId: string;
    configFileUrl: string | undefined;
    amsPort: string;
    constructor(url: string, amsNetId: string, configFileUrl?: string | undefined, amsPort?: string);
    init(): Promise<TAME>;
}
export declare const plcInit: (isCX8190?: boolean, useConfigFile?: boolean) => Promise<TAME>;
export declare const testPlc: () => Promise<void>;
