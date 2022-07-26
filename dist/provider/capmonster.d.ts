export declare const PROVIDER_ID = "capmonster";
import * as types from "../types/plugin";
import Solver from "./capmonster-api";
export default class CapMonsterProvider {
    private readonly solver;
    constructor(solver: Solver);
    private decodeRecaptchaAsync;
    getSolutions: (captchas?: types.CaptchaInfo[], token?: string) => Promise<types.GetSolutionsResult>;
    getSolution: (captcha: types.CaptchaInfo, token: string) => Promise<types.CaptchaSolution>;
}
