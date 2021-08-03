import { TokenInterface } from "./token.interface";
import { proxy } from "@discord/proxy/proxy.interface";
import console from "@utils/console";

import axios from "axios";
import rax from "retry-axios";
import randomUseragent from "random-useragent";
import randomElement from "@utils/random-element";
import { HttpsProxyAgent } from "https-proxy-agent";
import axiosRetry from "axios-retry";

class Token implements TokenInterface {
	// private getRequestSettings(
	// 	url: string,
	// 	method: Method,
	// 	timeout: number | undefined,
	// 	source: CancelTokenSource,
	// 	userAgent: string | null,
	// 	proxyAgent: HttpsProxyAgent,
	// 	token: string,
	// 	data: any
	// ): AxiosRequestConfig {
	// 	return {
	// 		method: method,
	// 		url: url,
	// 		timeout: timeout || 30000,
	// 		cancelToken: source.token,
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 			"User-Agent": userAgent,
	// 			Authorization: token,
	// 		},
	// 		proxy: false,
	// 		httpsAgent: proxyAgent,
	// 		data: data,
	// 	};
	// }

	public checkToken(tokenArr: Array<string>, proxyArr: Array<proxy>, timeout?: number, silentMode?: boolean): Promise<string[]> {
		const validTokenArr: Array<string> = [];
		return Promise.all(
			tokenArr.map(async (token) => {
				let proxyEl = randomElement.getRandomElement(proxyArr);
				let proxyAgent = new HttpsProxyAgent({ host: proxyEl.ip, port: proxyEl.port, protocol: proxyEl.protocol === "socks4" || proxyEl.protocol === "socks5" ? proxyEl.protocol : "http" });
				const userAgent = randomUseragent.getRandom();
				let source = axios.CancelToken.source();
				const i = setTimeout(() => {
					source.cancel();
				}, (timeout! * 2) | 60000);
				try {
					const myAxiosInstance = axios.create();
					myAxiosInstance.defaults.raxConfig = {
						instance: myAxiosInstance,
					};
					rax.attach(myAxiosInstance);
					const firstRes = await myAxiosInstance({
						method: "GET",
						url: "https://discord.com/api/v9/users/@me",
						timeout: timeout || 30000,
						cancelToken: source.token,
						headers: {
							"Content-Type": "application/json",
							"User-Agent": userAgent,
							Authorization: token,
						},
						raxConfig: {
							retry: 3,
							retryDelay: 250,
							instance: myAxiosInstance,
							onRetryAttempt: (err) => {
								proxyEl = randomElement.getRandomElement(proxyArr);
								proxyAgent = new HttpsProxyAgent({ host: proxyEl.ip, port: proxyEl.port, protocol: proxyEl.protocol === "socks4" || proxyEl.protocol === "socks5" ? proxyEl.protocol : "http" });
							},
							shouldRetry: (err) => {
								return err.toString().includes("ECONNABORTED") || err.code == "ETIMEDOUT" || err.toString().includes("Error: timeout of ");
							},
						},
						proxy: false,
						httpsAgent: proxyAgent,
					});
					const secondRes = await myAxiosInstance({
						method: "POST",
						url: "https://discord.com/api/v9/users/@me/channels",
						timeout: timeout || 30000,
						headers: {
							"Content-Type": "application/json",
							"User-Agent": userAgent,
							Authorization: token,
						},
						cancelToken: source.token,
						raxConfig: {
							retry: 3,
							retryDelay: 250,
							instance: myAxiosInstance,
							onRetryAttempt: (err) => {
								proxyEl = randomElement.getRandomElement(proxyArr);
								proxyAgent = new HttpsProxyAgent({ host: proxyEl.ip, port: proxyEl.port, protocol: proxyEl.protocol === "socks4" || proxyEl.protocol === "socks5" ? proxyEl.protocol : "http" });
							},
							shouldRetry: (err) => {
								return err.toString().includes("ECONNABORTED");
							},
						},
						proxy: false,
						httpsAgent: proxyAgent,
						data: { recipients: [] },
					});
					clearTimeout(i);
					if (!firstRes.data.verified && !firstRes.data) {
						return silentMode ? null : console.warn(`Токен ${token} без верификации!`);
					} else if (!firstRes.data.verified && firstRes.data && firstRes.data.code != 40002) {
						silentMode ? null : validTokenArr.push(token);
						console.success(`Токен ${token} валидный (без верификации)!`);
					} else if (firstRes.data.verified && secondRes.data.code == 40002) {
						return silentMode ? null : console.warn(`Токен ${token} заморожен!`);
					} else if (firstRes.data.verified && secondRes.data) {
						silentMode ? null : validTokenArr.push(token);
						console.success(`Токен ${token} валидный!`);
					} else throw new Error(firstRes.data + secondRes.data);
				} catch (error) {
					clearTimeout(i);
					if (error.response && error.response.data && error.response.data.message == "401: Unauthorized") {
						return silentMode ? null : console.warn(`Токен ${token} невалидный!`);
					} else if (error.response && error.response.data && error.response.data.retry_after) {
						axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay });
					} else if (error.code == "ECONNRESET") {
						return silentMode ? null : console.error(`Сервер внезапно закрыл соединение для токена ${token}!`);
					} else if (error.code == "ETIMEDOUT" || error.toString().includes("Error: timeout of ")) {
						return silentMode ? null : console.error(`Не удалось проверить токен ${token}, истекло время ожидания ответа от сервера!`);
					} else if ((error.response && error.response.data && error.response.data.code == 40002) || error.toString().includes("Error: Request failed with status code 403")) {
						return silentMode ? null : console.warn(`Токен ${token} заморожен!`);
					} else if (error == "Cancel" || error.toString().includes("ERR_SOCKET_CLOSED")) {
						return silentMode ? null : console.error(`Не удалось проверить токен ${token}, ошибка прокси!`);
					} else {
						return silentMode ? null : console.critical("Unhandler error:" + error);
					}
				}
			})
		).then(function () {
			return validTokenArr;
		});
	}
}

export = new Token();
