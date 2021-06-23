import { proxy } from "@discord/proxy/proxy.interface";
import randomElement from "@project/library/utils/random-element";
import { userResults } from "../user.interface";
import console from "@utils/console";

import randomUseragent from "random-useragent";
import axios from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";

export = function sendMessageToUser(userArr: Array<string>, tokenArr: Array<string>, proxyArr: Array<proxy>, message: string, timeout?: number, silentMode?: Boolean): Promise<userResults> {
	const userObj: userResults = {
		succeedUsers: [],
		unsucceedUsers: [],
	};
	return Promise.all(
		userArr.map(async (userId) => {
			let source = axios.CancelToken.source();
			const i = setTimeout(() => {
				source.cancel();
			}, timeout);
			const proxyEl = randomElement.getRandomElement(proxyArr);
			const token = randomElement.getRandomElement(tokenArr);
			await axios({
				method: "POST",
				url: `https://discord.com/api/v9/channels/${userId}/messages`,
				timeout: timeout || 30000,
				cancelToken: source.token,
				headers: {
					"Content-Type": "application/json",
					"User-Agent": randomUseragent.getRandom(),
					Authorization: token,
				},
				data: {
					content: message,
					tts: false,
				},
				proxy: false,
				httpsAgent: new HttpsProxyAgent({ host: proxyEl.ip, port: proxyEl.port, protocol: proxyEl.protocol === "socks4" || proxyEl.protocol === "socks5" ? proxyEl.protocol : "http" }),
			})
				.then(() => {
					clearTimeout(i);
					userObj.succeedUsers.push(userId);
					silentMode ? null : console.success(`Сообщение отправлено юзеру ${userId}!`);
				})
				.catch(function (error) {
					clearTimeout(i);
					if (error.code == "ECONNRESET") {
						console.log(error);
						return silentMode ? null : console.error(`Сервер внезапно закрыл соединение во время отправки юзеру ${userId}!`);
					} else if (error.code == "ETIMEDOUT") {
						return silentMode ? null : console.error(`Не удалось отправить сообщение с токена ${token}, истекло время ожидания ответа от сервера!`);
					} else if (error.request || error == "Cancel") {
						return silentMode ? null : console.error(`Не удалось отправить сообщение с прокси ${proxyEl.ip}:${proxyEl.port}, ошибка прокси!`);
					} else if (error.response.status === 401) {
						return silentMode ? null : console.error(`Не удалось отправить сообщение с токена ${token}, ошибка токена!`);
					} else if (error.response.status === 403) {
						return silentMode ? null : console.error(`Не удалось отправить сообщение с токена ${token}, Forbidden!`);
					} else if (error.response.status === 404) {
						return silentMode ? null : console.error(`Юзер ${userId} не найден!`);
					} else if (error.response.status === 429) {
						return silentMode ? null : console.error(`Слишком много запросов в минуту!`);
					} else if (error.response) {
						return silentMode ? null : console.log(error);
					} else {
						return silentMode ? null : console.critical("Unhandler error:" + error);
					}
					return;
				});
		})
	).then(function () {
		return userObj;
	});
};
