export interface CapMonsterOptions {
    pollingInterval: number;
    retries: number;
}

export interface CapMonsterApiBaseResult {
    errorID: number;
    errorCode: string;
}

export interface CapMonsterApiCreateTaskResult extends CapMonsterApiBaseResult {
    taskId: number;
}

export interface CapMonsterApiGetTaskResultResult extends CapMonsterApiBaseResult {
    status: "processing" | "ready";
    solution?: { gRecaptchaResponse: string };
}

export interface CapMonsterApiBalanceResult extends CapMonsterApiBaseResult {
    balance: number;
}
