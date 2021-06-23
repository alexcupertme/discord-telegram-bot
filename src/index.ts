import console from "@utils/console";
import User from "@discord/user";

class App {
	public async init() {
		console.log("Программа запущена!");
		const userList = await User.parseUsersFromGroup("sahahb99@mail.ru", "ocminog-82nog", "https://discord.com/channels/690908396404080650/715369975035985970");
		console.success("Завершено! Собрано " + userList.length + " пользователей!");
	}

	constructor() {
		this.init();
	}
}
new App();
