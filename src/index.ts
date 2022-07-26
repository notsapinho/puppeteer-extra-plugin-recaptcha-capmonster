import CapMonsterProvider, { PROVIDER_ID } from "./provider/capmonster";

import * as types from "./types/plugin";

class Plugin {
	private readonly provider: CapMonsterProvider;

	constructor(provider: CapMonsterProvider) {
		this.provider = provider;
	}

	use(providers: types.SolutionProvider[]) {
		providers.push({ id: PROVIDER_ID, fn: this.provider.getSolutions });
	}
}

export default Plugin;
