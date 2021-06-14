import console from "@project/src/library/utils/console-menu";

class App {
	public init() {
		console.log("Started program");
		console.warn("Some warn");
		console.error("Some error");
	}

	constructor() {
		this.init();
	}
}
new App();
