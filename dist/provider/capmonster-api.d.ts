import { AxiosInstance, AxiosResponse } from "axios";
import * as types from "../types/capmonster";
declare class CapMonster {
    private clientKey;
    opts: types.CapMonsterOptions;
    recognizingThreshold: number;
    $http: AxiosInstance;
    constructor(clientKey?: string, opts?: types.CapMonsterOptions);
    hasProxy: () => boolean;
    setApiKey: (apiKey: string) => string;
    getBalance: () => Promise<AxiosResponse<types.CapMonsterApiBalanceResult>>;
    createTask: (task?: {}) => Promise<AxiosResponse<types.CapMonsterApiCreateTaskResult>>;
    decodeReCaptcha: (method: string, websiteURL: string, websiteKey: string, callback: any) => Promise<any>;
    getResult: (taskId: number) => Promise<AxiosResponse<types.CapMonsterApiGetTaskResultResult>>;
    private proxyConfigDTO;
}
export default CapMonster;
