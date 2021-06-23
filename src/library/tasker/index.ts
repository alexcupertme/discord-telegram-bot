import * as Bull from "bull";

class Tasker {
	public queue = this.startQueue();
	constructor() {
		this.queue;
		this.checkState();
	}
	public startQueue(): Bull.Queue<any> {
		console.log("Started new queue");
		const queue: Bull.Queue<any> = new Bull.default("task queue", {
			redis: {
				host: "redis-14320.c226.eu-west-1-3.ec2.cloud.redislabs.com",
				port: 14320,
				password: "RwrBS7J6DHsB0GSSg8Npe2iBiptMLlNK",
			},
		});
		return queue;
	}
	private checkState() {
		this.queue.on("completed", function (job, result) {
			// Job completed with output result!
		});
	}
	public createTask(): string {
		let task: string = "q144124";
		return "Задание" + task + "запущено в очередь";
	}
}

export = new Tasker();
