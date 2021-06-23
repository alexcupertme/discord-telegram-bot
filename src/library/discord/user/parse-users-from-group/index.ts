import { proxy } from "@discord/proxy/proxy.interface";
import authorizeFormDiscord from "./authorize-form-discord";
import minArgs from "./minArgs.json";
import console from "@utils/console";
import startBrowser from "./start-browser";

export = function parseUsersFromGroup(email: string, password: string, url: string, proxyArr?: Array<proxy>, timeout?: number, silentMode?: Boolean): Promise<string[]> {
	return new Promise(async (resolve, reject) => {
		try {
			console.log("Запуск браузера Chromium и Puppeteer");
			const requests: string[] = [];
			const browser = await startBrowser(minArgs, true);
			const context = await browser.createIncognitoBrowserContext();
			const page = await context.newPage();
			page.setDefaultNavigationTimeout(45000);
			await page.setRequestInterception(true);

			page.on("request", (interceptedRequest) => {
				requests.push(interceptedRequest.url());
				interceptedRequest.continue();
			});
			page.on("error", (err) => {
				console.error("Ошибка Puppeteer! Ошибка: " + err.message);
			});

			await page.goto(url);
			console.log("Авторизация Discord...");
			await authorizeFormDiscord(email, password, page);
			console.log("Авторизация прошла успешно!");
			await page.waitForSelector("div[class^='members-']");
			console.log("Запуск парсинга!");

			await page.evaluate(() => {
				let el = null;
				while (el == null || el == undefined) {
					el = document.querySelector("div[class^='members-']");
				}
				el.scrollBy(0, el.scrollHeight);
			});

			await page.waitForSelector("div[class^='members-'] div[class^='content-'] div[class^='member-'][data-list-item-id^='members-'][aria-controls^='popout_']:last-child");
			await page.waitForTimeout(2000);
			const errorTimeouts = [];
			errorTimeouts.push(
				setTimeout(() => {
					console.critical("Не удалось найти стартовый элемент!");
				}, 10000)
			);
			let i = await page.evaluate(() => {
				let childEl = null;
				while (childEl == null) {
					childEl = document.querySelector("div[class^='members-'] div[class^='content-'] div[class^='member-'][data-list-item-id^='members-'][aria-controls^='popout_']:last-child");
				}
				return parseInt(childEl.getAttribute("index") || "0");
			});
			clearTimeout(errorTimeouts[0]);
			console.log("Парсинг успешно запущен!");
			const infoInterval = setInterval(() => {
				console.log("Текущий индекс: " + i);
			}, 5000);
			while (i > 10) {
				try {
					i -= 5;
					await page.waitForSelector(`div[index="${i}"]`);
					await page.evaluate((i) => {
						const element = document.querySelector(`div[index="${i - 5}"]`);
						element!.scrollIntoView(false);
					}, i);
				} catch {}
			}
			clearInterval(infoInterval);
			console.success("Парсинг завершен! Сбор и сохранение результатов!");
			let filteredReq: Array<string> = [];
			await requests.forEach((te) => {
				if (te.includes("https://cdn.discordapp.com/avatars/")) filteredReq.push(te.match(/(?<=https:\/\/cdn\.discordapp\.com\/avatars\/)(.*)(?=\/)/)![0]);
			});
			await browser.close();
			await resolve(filteredReq);
		} catch (e) {
			if (e.toString().includes("net::ERR_ABORTED")) {
				console.critical("Невозможно подключиться к странице авторизации! Ошибка: " + e);
			} else if (e.toString().includes("waiting for selector `div[orientation='vertical'][data-jump-section='global'][style='overflow: hidden scroll; padding-right: 0px;'][id^=members]`")) {
				console.critical("Не удалось пройти авторизацию!");
			} else {
				console.critical("Ошибка: " + e);
			}
		}
	});
};
