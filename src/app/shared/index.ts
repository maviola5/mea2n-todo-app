export class Message {
	text: string;
	active: boolean;

	constructor(obj?: any) {
		this.text 		= obj && obj.text 		|| '';
		this.active		= obj && obj.active		|| false;
	}
}