import { ConsoleUtilsInterface } from "./console-utils.interface";
import currentDate from "@library/utils/current-date";

import chalk from "chalk";

class ConsoleUtils implements ConsoleUtilsInterface {
	public log(message: string | number | Array<any> | Record<string, any> | null | undefined): void {
		console.log(chalk.bgCyan.black.dim("[INFO]"), chalk.gray(currentDate.getDate), message);
	}
	public warn(message: string | number | Array<any> | Record<string, any> | null | undefined): void {
		console.log(chalk.bgYellow.black.dim("[WARNING]"), chalk.gray(currentDate.getDate), message);
	}
	public success(message: string | number | Array<any> | Record<string, any> | null | undefined): void {
		console.log(chalk.bgGreen.black.dim("[SUCCESS]"), chalk.gray(currentDate.getDate), message);
	}
	public error(message: string | number | Array<any> | Record<string, any> | null | undefined): void {
		console.log(chalk.bgRedBright.black.dim("[ERROR]"), chalk.gray(currentDate.getDate), message);
	}
	public critical(message: string | number | Array<any> | Record<string, any> | null | undefined): void {
		console.log(chalk.bgRed.black.dim("[CRITICAL]"), chalk.gray(currentDate.getDate), message);
	}
	public customizable(prefix: string, message: string | number | Array<any> | Record<string, any> | null | undefined, prefixColor: string, textColor: string): void {
		console.log(chalk.bgHex(prefixColor).black.dim(`[${prefix}]`), chalk.gray(currentDate.getDate), chalk.hex(textColor).black.dim(message));
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public default(any: any): void {
		console.log(any);
	}
}

export = new ConsoleUtils();
