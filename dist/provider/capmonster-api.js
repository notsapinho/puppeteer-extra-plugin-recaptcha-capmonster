"use strict";
// https://github.com/hanahaneull/capmonster/blob/master/src/index.js adapted to Typescript
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class CapMonster {
    constructor(clientKey, opts) {
        this.hasProxy = () => this.opts.proxyConfig != null;
        this.setApiKey = (apiKey) => (this.clientKey = apiKey);
        this.getBalance = () => this.$http.post("/getBalance", {
            clientkey: this.clientKey
        });
        this.createTask = (task = {}) => this.$http.post("/createTask", {
            clientKey: this.clientKey,
            task
        });
        this.decodeReCaptcha = async (method, websiteURL, websiteKey, callback) => {
            var _a;
            let solved = false;
            let retries = 0;
            let proxyConfig = this.opts.proxyConfig != null ? this.proxyConfigDTO(this.opts.proxyConfig) : null;
            const response = await this.$http.post("/createTask", {
                clientKey: this.clientKey,
                task: {
                    type: method,
                    websiteURL: websiteURL,
                    websiteKey: websiteKey,
                    ...proxyConfig,
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
                        text: (_a = result.data.solution) === null || _a === void 0 ? void 0 : _a.gRecaptchaResponse
                    });
                }
            }
        };
        this.getResult = (taskId) => this.$http.post("/getTaskResult", {
            clientKey: this.clientKey,
            taskId
        });
        this.proxyConfigDTO = (config) => ({
            proxyType: config.type,
            proxyAddress: config.address,
            proxyPort: config.port,
            proxyLogin: config.login,
            proxyPassword: config.password,
        });
        if (!opts) {
            this.opts = {
                pollingInterval: 2000,
                retries: 50
            };
        }
        this.clientKey = clientKey;
        this.$http = axios_1.default.create({ baseURL: "https://api.capmonster.cloud" });
    }
}
exports.default = CapMonster;
//# sourceMappingURL=capmonster-api.js.map