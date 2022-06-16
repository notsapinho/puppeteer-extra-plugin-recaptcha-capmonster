# CapMonster provider for puppeteer-extra-plugin-recaptcha!

> This is a plugin for [puppeteer-extra-plugin-recaptcha](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-recaptcha) that implements [CapMonster](https://capmonster.cloud) provider to the solver.

![](https://i.imgur.com/SWrIQw0.gif)

### Install

```bash
npm i puppeteer-extra-plugin-recaptcha-capmonster
# - or -
yarn add puppeteer-extra-plugin-recaptcha-capmonster
```

### Usage

```js
const puppeteer = require("puppeteer-extra");
const { default: RecaptchaPlugin, BuiltinSolutionProviders } = require("puppeteer-extra-plugin-recaptcha");
const CapMonsterProvider = require("puppeteer-extra-plugin-recaptcha-capmonster");

CapMonsterProvider.use(BuiltinSolutionProviders);

puppeteer.use(
	RecaptchaPlugin({
		provider: {
			id: "capmonster",
			token: "XXXXXXX" // REPLACE THIS WITH YOUR OWN CAPMONSTER API KEY ⚡
		},
		visualFeedback: true // colorize reCAPTCHAs (violet = detected, green = solved)
	})
);

// puppeteer usage as normal
puppeteer.launch({ headless: true }).then(async (browser) => {
	const page = await browser.newPage();
	await page.goto("https://www.google.com/recaptcha/api2/demo");

	// That's it, a single line of code to solve reCAPTCHAs 🎉
	await page.solveRecaptchas();

	await Promise.all([page.waitForNavigation(), page.click(`#recaptcha-demo-submit`)]);
	await page.screenshot({ path: "response.png", fullPage: true });
	await browser.close();
});
```

## Credits

-   Thanks to [berstend](https://github.com/berstend) for the original plugin
-   Thanks to [hanahaneull](https://github.com/hanahaneull) for the capmonster solver
