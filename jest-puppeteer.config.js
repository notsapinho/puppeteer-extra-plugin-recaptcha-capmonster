require("dotenv/config");

const puppeteer = require("puppeteer-extra");
const { default: RecaptchaPlugin, BuiltinSolutionProviders } = require("puppeteer-extra-plugin-recaptcha");
const CapMonsterProvider = require("./dist/index.cjs.js");

CapMonsterProvider.use(BuiltinSolutionProviders);

puppeteer.use(
	RecaptchaPlugin({
		provider: {
			id: "capmonster",
			token: process.env.CAPMONSTER_KEY
		},
		visualFeedback: true
	})
);

if (!process.env.CAPMONSTER_KEY) {
	console.error('\nCAPMONSTER_KEY not set in ".env"');
	process.exit();
}

// Change jest-puppeteer "puppeteer" to "puppeteer-extra"
require.cache[require.resolve("puppeteer")] = require.cache[require.resolve("puppeteer-extra")];

module.exports = {};
