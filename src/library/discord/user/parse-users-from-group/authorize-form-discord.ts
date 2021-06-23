import { Page } from "puppeteer";

export = async function authorizeFormDiscord(email: string, password: string, page: Page) {
	await page.focus("input[type='password']");
	await page.keyboard.type(password);
	await page.focus("input[type='text']");
	await page.keyboard.type(email);
	await page.click("button[type='submit']");
	await page.waitForSelector("div[orientation='vertical'][data-jump-section='global'][style='overflow: hidden scroll; padding-right: 0px;'][id^=members]");
	return true;
};
