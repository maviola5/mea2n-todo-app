import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Task } from '../shared';

@Component({
	selector: 'task',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.css'],
	host : {
		'class' : 'task'
	}
})
export class TaskComponent implements OnInit {
	@Input() task: Task;

	@Output() updateTaskEvent: EventEmitter<Task>;
	@Output() deleteTaskEvent: EventEmitter<Task>;

	constructor() {
		this.deleteTaskEvent = new EventEmitter();
		this.updateTaskEvent = new EventEmitter();
	}

	ngOnInit() {}

	markTask(task: Task): any{
		if(task.completed){
			task.completed = false;
			return this.updateTaskEvent.emit(task);
		}
		if(!task.completed){
			task.completed = true;
			return this.updateTaskEvent.emit(task);
		}
		
	}

	deleteTask(task: Task){
		return this.deleteTaskEvent.emit(task);
	}

}
