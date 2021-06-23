export interface ProxyInterface {
	checkProxy(url: string, proxyArr: Array<proxy>, timeout: number, silentMode?: boolean): Promise<proxy[]>;
}

export type proxy = {
	protocol: "http" | "socks5" | "socks4" | "https";
	ip: string;
	port: number;
};
