import { RandomElementInterface } from "./random-element.interface";

class RandomElement implements RandomElementInterface {
	getRandomElement(itemContainer: any): any {
		return itemContainer[Math.floor(Math.random() * itemContainer.length)];
	}
}

export = new RandomElement();
