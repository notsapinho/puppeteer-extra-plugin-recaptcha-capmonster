import CapMonsterProvider from "./provider/capmonster";
import * as types from "./types/plugin";
declare class Plugin {
    private readonly provider;
    constructor(provider: CapMonsterProvider);
    use(providers: types.SolutionProvider[]): void;
}
export default Plugin;
