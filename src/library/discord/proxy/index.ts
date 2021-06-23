import { proxy, ProxyInterface } from "./proxy.interface";
import console from "@utils/console";

import axios from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";
import randomUseragent from "random-useragent";

class Proxy implements ProxyInterface {
	public checkProxy(url: string, proxyArr: Array<proxy>, timeout?: number, silentMode?: boolean): Promise<proxy[]> {
		const validProxyArr: Array<proxy> = [];
		return Promise.all(
			proxyArr.map(async (proxyEl) => {
				let source = axios.CancelToken.source();
				const i = setTimeout(() => {
					source.cancel();
				}, timeout);
				await axios({
					method: "POST",
					url: url,
					timeout: timeout || 30000,
					cancelToken: source.token,
					headers: {
						"Content-Type": "application/json",
						"User-Agent": randomUseragent.getRandom(),
					},
					proxy: false,
					httpsAgent: new HttpsProxyAgent({ host: proxyEl.ip, port: proxyEl.port, protocol: proxyEl.protocol === "socks4" || proxyEl.protocol === "socks5" ? proxyEl.protocol : "http" }),
				})
					.then(() => {
						clearTimeout(i);
						validProxyArr.push(proxyEl);
						silentMode ? null : console.success("Прокси " + proxyEl.ip + ":" + proxyEl.port + " рабочий");
					})
					.catch(function (error) {
						clearTimeout(i);
						if (error.response || error.request || error == "Cancel") {
							return silentMode ? null : console.warn("Прокси " + proxyEl.ip + ":" + proxyEl.port + " нерабочий");
						} else {
							return silentMode ? null : console.critical("Unhandler error:" + error);
						}
					});
			})
		).then(function () {
			return validProxyArr;
		});
	}
}

export = new Proxy();
