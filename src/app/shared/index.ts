export class Message {
	text: string;
	active: boolean;

	constructor(obj?: any) {
		this.text 		= obj && obj.text 		|| '';
		this.active		= obj && obj.active		|| false;
	}
}

export class Task {
	id: string;
	name: string;
	completed: boolean;

	constructor(obj?: any){
		this.id 		= obj && obj.id 		|| null;
		this.name 		= obj && obj.name 		|| null;
		this.completed 	= obj && obj.completed 	|| false;
	}
}