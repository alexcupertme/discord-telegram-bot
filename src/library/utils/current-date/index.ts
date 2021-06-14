import * as month from "./month-names.json";
import CurrentDateInterface from "./current-date.interface";

class CurrentDate implements CurrentDateInterface {
	/**
	 * Returns date on your PC
	 * @example 2021 June 14 22:04:26
	 */
	public get getDate() {
		const date = new Date();
		return `${date.getFullYear()} ${month.names[date.getMonth()]} ${date.getDate()} ${date.getHours() < 10 ? 0 + date.getHours().toString() : date.getHours()}:${
			date.getMinutes() < 10 ? 0 + date.getMinutes().toString() : date.getMinutes()
		}:${date.getSeconds() < 10 ? 0 + date.getSeconds().toString() : date.getSeconds()}`;
	}
}

export = new CurrentDate();
