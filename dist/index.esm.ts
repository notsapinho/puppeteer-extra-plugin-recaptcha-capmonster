/*!
 * puppeteer-extra-plugin-recaptcha-capmonster v1.0.5 by notsapinho
 * https://github.com/https://github.com/notsapinho/puppeteer-extra-plugin-recaptcha-capmonster.git
 * @license MIT
 */
import Debug from 'debug';

const PROVIDER_ID = "capmonster";
Debug(`puppeteer-extra-plugin:recaptcha-capmonster:${PROVIDER_ID}`);

class Plugin {
    constructor(provider) {
        this.provider = provider;
    }
    use(providers) {
        providers.push({ id: PROVIDER_ID, fn: this.provider.getSolutions });
    }
}

export { Plugin as default };
//# sourceMappingURL=index.esm.ts.map
