import console from "@utils/console";
import Proxy from "@discord/proxy";
import fs from "fs";
import { proxy } from "@discord/proxy/proxy.interface";
import path from "path";
import Token from "@discord/token";

class App {
	public async init() {
		console.log("Started program");
		const proxyListText = fs
			.readFileSync(path.join(__dirname + "/../123.txt"), {
				encoding: "utf-8",
			})
			.split("\n");
		let proxyList: Array<proxy> = [];
		proxyListText.map((proxy) => {
			return proxyList.push({ ip: proxy.split(":")[0], port: parseInt(proxy.split(":")[1]), protocol: "https" });
		});
		const freshProxyList = await Proxy.checkProxy("https://discord.com/", proxyList, 6000, false);
		const tokenList: Array<string> = await fs
			.readFileSync(path.resolve(__dirname + "/" + "../allTokens.txt"), {
				encoding: "utf-8",
			})
			.toString()
			.split("\r\n");
		const filteredTokens: string[] = [];
		await tokenList.forEach((token) => {
			token.replace("\n", "");
			if (/([a-zA-Z0-9-]\S{23})\.([a-zA-Z0-9-]\S{5})\.([a-zA-Z0-9-]\S{26})/.test(token)) {
				filteredTokens.push(token);
			}
		});
		const freshTokenList = await Token.checkToken(filteredTokens, freshProxyList, 15000, false);
		console.success("Проверка токенов закончена! Найдено " + freshTokenList.length + " валидных токенов!");
		fs.writeFileSync("tokens3.json", JSON.stringify(freshTokenList));
	}

	constructor() {
		this.init();
	}
}
new App();
