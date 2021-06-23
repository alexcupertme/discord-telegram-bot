import { RandomExpStringInterface } from "./random-exp-string.interface";

import RandExp from "randexp";

class RandomExpString implements RandomExpStringInterface {
	generateString(regexp: RegExp, count: number): Array<string> {
		const genArr: Array<string> = [];
		for (let i = 0; i < count; i++) {
			genArr.push(new RandExp(regexp).gen());
		}
		return genArr;
	}
}

export = new RandomExpString();
