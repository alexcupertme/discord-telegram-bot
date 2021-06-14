import console from "@project/src/library/utils/console-menu";

class App {
	public init() {
		console.customizable("LOG", "Started some program", "#FFFFFF", "#AAAAAA");
	}

	constructor() {
		this.init();
	}
}
new App();
