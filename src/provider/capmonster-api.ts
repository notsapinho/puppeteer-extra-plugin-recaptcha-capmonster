// https://github.com/hanahaneull/capmonster/blob/master/src/index.js adapted to Typescript

import axios, { AxiosInstance, AxiosResponse } from "axios";
import * as types from "../types/capmonster";

class CapMonster {
    private clientKey: string;

    public opts: types.CapMonsterOptions;
    public recognizingThreshold: number;
    public $http: AxiosInstance;

    constructor(clientKey?: string, opts?: types.CapMonsterOptions) {
        if (!opts) {
            this.opts = {
                pollingInterval: 2000,
                retries: 50
            };
        }

        this.clientKey = clientKey;

        this.$http = axios.create({ baseURL: "https://api.capmonster.cloud" });
    }

    setApiKey = (apiKey: string): string => (this.clientKey = apiKey);

    getBalance = (): Promise<AxiosResponse<types.CapMonsterApiBalanceResult>> =>
        this.$http.post("/getBalance", {
            clientkey: this.clientKey
        });

    createTask = (task = {}): Promise<AxiosResponse<types.CapMonsterApiCreateTaskResult>> =>
        this.$http.post<types.CapMonsterApiCreateTaskResult>("/createTask", {
            clientKey: this.clientKey,
            task
        });

    decodeReCaptcha = async (method: string, websiteURL: string, websiteKey: string, callback: any) => {
        let solved = false;
        let retries = 0;

        const response = await this.$http.post<types.CapMonsterApiCreateTaskResult>("/createTask", {
            clientKey: this.clientKey,
            task: {
                type: method,
                websiteURL: websiteURL,
                websiteKey: websiteKey
            }
        });

        while (!solved) {
            if (retries === this.opts.retries) {
                return callback("CAPTCHA_FAILED_TOO_MANY_TIMES");
            }

            retries++;

            await new Promise((resolve) => setTimeout(resolve, this.opts.pollingInterval));
            const result = await this.getResult(response.data.taskId);
            if (result.data.status === "ready") {
                solved = true;
                return callback(null, {
                    id: response.data.taskId,
                    text: result.data.solution.gRecaptchaResponse
                });
            }
        }
    };

    getResult = (taskId: number): Promise<AxiosResponse<types.CapMonsterApiGetTaskResultResult>> =>
        this.$http.post<types.CapMonsterApiGetTaskResultResult>("/getTaskResult", {
            clientKey: this.clientKey,
            taskId
        });
}

export default CapMonster;
