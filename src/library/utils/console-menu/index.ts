import currentDate from "@project/src/library/utils/current-date";
import chalk from "chalk";
import ConsoleUtilsInterface from "./console-utils.interface";

class ConsoleUtils implements ConsoleUtilsInterface {
	public log(message: string): void {
		console.log(chalk.bgCyan.black.dim("[INFO]"), chalk.gray(currentDate.getDate), message);
	}
	public warn(message: string): void {
		console.log(chalk.bgYellow.black.dim("[WARNING]"), chalk.gray(currentDate.getDate), message);
	}
	public error(message: string): void {
		console.log(chalk.bgRedBright.black.dim("[ERROR]"), chalk.gray(currentDate.getDate), message);
	}
	public critical(message: string): void {
		console.log(chalk.bgRed.black.dim("[CRITICAL]"), chalk.gray(currentDate.getDate), message);
	}
	public customizable(prefix: string, message: string, prefixColor: string, textColor: string): void {
		console.log(chalk.bgHex(prefixColor).black.dim(`[${prefix}]`), chalk.gray(currentDate.getDate), chalk.hex(textColor).black.dim(message));
	}
}

export = new ConsoleUtils();
