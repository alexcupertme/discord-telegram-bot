import { proxy } from "@discord/proxy/proxy.interface";

export interface TokenInterface {
	checkToken(tokenArr: Array<string>, proxyArr: Array<proxy>, timeout: number, silentMode?: boolean): void;
}
