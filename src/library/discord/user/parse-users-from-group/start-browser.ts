import puppeteer from "puppeteer";

export = async function startBrowser(minArgs: { minArg: any }, isHeadless: boolean) {
	return await puppeteer.launch({
		headless: true,
		// @ts-ignore
		waitUntil: "domcontentloaded",
		args: minArgs.minArg,
	});
};
