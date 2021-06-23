import { UserInterface, userResults } from "./user.interface";
import { proxy } from "../proxy/proxy.interface";
import parseUsersFromGroup from "./parse-users-from-group";
import sendMessageToUser from "./send-message-to-user/index";

class User implements UserInterface {
	// public registerAccounts(captchaKey: string, accountCount: number, timeout?: number, silentMode?: Boolean): Promise<registerResults[]> {
	// 	const registerArr: registerResults[] = [];
	// 	return Promise.all(
	// 		userArr.map(async (userId) => {
	// 			let source = axios.CancelToken.source();
	// 			const i = setTimeout(() => {
	// 				source.cancel();
	// 			}, timeout);
	// 			const proxyEl = randomElement.getRandomElement(proxyArr);
	// 			const token = randomElement.getRandomElement(tokenArr);
	// 			await axios({
	// 				method: "POST",
	// 				url: `https://discord.com/api/v9/auth/register`,
	// 				timeout: timeout || 30000,
	// 				cancelToken: source.token,
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 					"User-Agent": randomUseragent.getRandom(),
	// 					Authorization: token,
	// 				},
	// 				data: {
	// 					content: message,
	// 					tts: false,
	// 				},
	// 				proxy: false,
	// 				httpsAgent: new HttpsProxyAgent({ host: proxyEl.ip, port: proxyEl.port, protocol: proxyEl.protocol === "socks4" || proxyEl.protocol === "socks5" ? proxyEl.protocol : "http" }),
	// 			})
	// 				.then(() => {
	// 					clearTimeout(i);
	// 					userObj.succeedUsers.push(userId);
	// 					silentMode ? null : console.success(`Сообщение отправлено юзеру ${userId}!`);
	// 				})
	// 				.catch(function (error) {
	// 					clearTimeout(i);
	// 					if (error.code == "ECONNRESET") {
	// 						console.log(error);
	// 						return silentMode ? null : console.error(`Сервер внезапно закрыл соединение во время отправки юзеру ${userId}!`);
	// 					} else if (error.code == "ETIMEDOUT") {
	// 						return silentMode ? null : console.error(`Не удалось отправить сообщение с токена ${token}, истекло время ожидания ответа от сервера!`);
	// 					} else if (error.request || error == "Cancel") {
	// 						return silentMode ? null : console.error(`Не удалось отправить сообщение с прокси ${proxyEl.ip}:${proxyEl.port}, ошибка прокси!`);
	// 					} else if (error.response.status === 429) {
	// 						return silentMode ? null : console.error(`Слишком много запросов в минуту!`);
	// 					} else if (error.response) {
	// 						return silentMode ? null : console.log(error);
	// 					} else {
	// 						return silentMode ? null : console.critical("Unhandler error:" + error);
	// 					}
	// 					return;
	// 				});
	// 		})
	// 	).then(function () {
	// 		return registerArr;
	// 	});
	// }
	public parseUsersFromGroup(email: string, password: string, url: string, proxyArr?: Array<proxy>, timeout?: number, silentMode?: Boolean): Promise<string[]> {
		return parseUsersFromGroup(email, password, url, proxyArr, timeout, silentMode);
	}
	public sendMessageToUser(userArr: Array<string>, tokenArr: Array<string>, proxyArr: Array<proxy>, message: string, timeout?: number, silentMode?: Boolean): Promise<userResults> {
		return sendMessageToUser(userArr, tokenArr, proxyArr, message, timeout, silentMode);
	}
}

export = new User();
