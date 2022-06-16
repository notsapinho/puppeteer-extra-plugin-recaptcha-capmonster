test("should solve a reCAPTCHA challenge", async () => {
	await page.goto("https://www.google.com/recaptcha/api2/demo", { waitUntil: "networkidle0" });

	const { captchas, solutions, solved, error } = await page.solveRecaptchas();

	//Expect to be no errors
	expect(error).toBeFalsy();

	// Expect to receive just 1 reCAPTCHA challenge
	expect(captchas.length).toBe(1);
	expect(solutions.length).toBe(1);
	expect(solved.length).toBe(1);

	// Expect it to be a reCAPTCHA challenge
	expect(solved[0]._vendor).toBe("recaptcha");

	//Expect the challenge to be solved
	expect(solved[0].isSolved).toBeTruthy();
});

test("should solve a hCAPTCHA hallenge", async () => {
	await page.goto("http://democaptcha.com/demo-form-eng/hcaptcha.html", { waitUntil: "networkidle0" });

	const { captchas, solutions, solved, error } = await page.solveRecaptchas();

	//Expect to be no errors
	expect(error).toBeFalsy();

	// Expect to receive just 1 hCAPTCHA challenge
	expect(captchas.length).toBe(1);
	expect(solutions.length).toBe(1);
	expect(solved.length).toBe(1);

	// Expect it to be a hCAPTCHA challenge
	expect(solved[0]._vendor).toBe("hcaptcha");

	//Expect the challenge to be solved
	expect(solved[0].isSolved).toBeTruthy();
});
