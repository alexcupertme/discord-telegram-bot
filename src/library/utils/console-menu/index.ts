import currentDate from "@project/src/library/utils/current-date";
import chalk from "chalk";
import ConsoleUtilsInterface from "./console-utils.interface";

class ConsoleUtils implements ConsoleUtilsInterface {
	public log(message: string): void {
		console.log(chalk.bgCyan.black.dim("[LOG]"), chalk.gray(currentDate.getDate), message);
	}
	public warn(message: string): void {
		console.log(chalk.bgYellow.black.dim("[WARNING]"), chalk.gray(currentDate.getDate), message);
	}
	public error(message: string): void {
		console.log(chalk.bgRed.black.dim("[ERROR]"), chalk.gray(currentDate.getDate), message);
	}
}

export = new ConsoleUtils();
