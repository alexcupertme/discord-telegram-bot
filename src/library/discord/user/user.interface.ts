import { proxy } from "@discord/proxy/proxy.interface";

export type registerResults = {
	token: string;
	data: {
		email: string;
		username: string;
		password: string;
		birthDate: string;
	};
};

export type userResults = {
	succeedUsers: Array<string>;
	unsucceedUsers: Array<string>;
};

export interface UserInterface {
	// registerAccounts(captchaKey: string, accountCount: number, timeout?: number, silentMode?: Boolean): Promise<registerResults[]>;
	parseUsersFromGroup(email: string, password: string, url: string, proxyArr: Array<proxy>, timeout?: number, silentMode?: Boolean): Promise<string[]>;
	sendMessageToUser(userArr: Array<string>, token: Array<string>, proxyArr: Array<proxy>, message: string, timeout?: number, silentMode?: Boolean): Promise<userResults>;
}
