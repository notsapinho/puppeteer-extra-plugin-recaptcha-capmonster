import * as CapMonster from "./provider/capmonster";

import * as types from "./types/plugin";

class Plugin {
    static use(providers: types.SolutionProvider[]) {
        providers.push({ id: CapMonster.PROVIDER_ID, fn: CapMonster.getSolutions });
    }
}

export default Plugin;
