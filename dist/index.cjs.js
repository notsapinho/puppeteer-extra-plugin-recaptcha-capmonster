/*!
 * puppeteer-extra-plugin-recaptcha-capmonster v1.0.5 by notsapinho
 * https://github.com/https://github.com/notsapinho/puppeteer-extra-plugin-recaptcha-capmonster.git
 * @license MIT
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Debug = require('debug');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Debug__default = /*#__PURE__*/_interopDefaultLegacy(Debug);

const PROVIDER_ID = "capmonster";
Debug__default["default"](`puppeteer-extra-plugin:recaptcha-capmonster:${PROVIDER_ID}`);

class Plugin {
    constructor(provider) {
        this.provider = provider;
    }
    use(providers) {
        providers.push({ id: PROVIDER_ID, fn: this.provider.getSolutions });
    }
}

exports["default"] = Plugin;


  module.exports = exports.default || {}
  Object.entries(exports).forEach(([key, value]) => { module.exports[key] = value })
//# sourceMappingURL=index.cjs.js.map
