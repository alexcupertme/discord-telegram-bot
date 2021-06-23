import { TokenInterface } from "./token.interface";
import { proxy } from "@discord/proxy/proxy.interface";
import console from "@utils/console";

import axios from "axios";
import randomUseragent from "random-useragent";
import randomElement from "@utils/random-element";
import { HttpsProxyAgent } from "https-proxy-agent";

class Token implements TokenInterface {
	public checkToken(tokenArr: Array<string>, proxyArr: Array<proxy>, timeout?: number, silentMode?: boolean): Promise<string[]> {
		const validTokenArr: Array<string> = [];
		return Promise.all(
			tokenArr.map(async (token) => {
				let source = axios.CancelToken.source();
				const i = setTimeout(() => {
					source.cancel();
				}, timeout);
				const proxyEl = randomElement.getRandomElement(proxyArr);
				await axios({
					method: "GET",
					url: "https://discord.com/api/v9/users/@me",
					timeout: timeout || 30000,
					cancelToken: source.token,
					headers: {
						"Content-Type": "application/json",
						"User-Agent": randomUseragent.getRandom(),
						Authorization: token,
					},
					proxy: false,
					httpsAgent: new HttpsProxyAgent({ host: proxyEl.ip, port: proxyEl.port, protocol: proxyEl.protocol === "socks4" || proxyEl.protocol === "socks5" ? proxyEl.protocol : "http" }),
				})
					.then(() => {
						clearTimeout(i);
						validTokenArr.push(token);
						silentMode ? null : console.success(`Токен ${token} валидный!`);
					})
					.catch(function (error) {
						clearTimeout(i);
						if (error.response) {
							return silentMode ? null : console.warn(`Токен ${token} невалидный!`);
						} else if (error.code == "ECONNRESET") {
							return silentMode ? null : console.error(`Сервер внезапно закрыл соединение для токена ${token}!`);
						} else if (error.code == "ETIMEDOUT") {
							return silentMode ? null : console.error(`Не удалось проверить токен ${token}, истекло время ожидания ответа от сервера!`);
						} else if (error.request || error == "Cancel") {
							return silentMode ? null : console.error(`Не удалось проверить токен ${token}, ошибка прокси!`);
						} else {
							return silentMode ? null : console.critical("Unhandler error:" + error);
						}
					});
			})
		).then(function () {
			return validTokenArr;
		});
	}
}

export = new Token();
