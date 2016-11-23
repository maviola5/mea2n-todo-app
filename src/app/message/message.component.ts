import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../shared';
@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

	@Input() message: Message;

	constructor() {}

	ngOnInit() {}

}
