import { Component, OnInit, Input } from '@angular/core';
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
	@Input() task: Task

	constructor() {}

	ngOnInit() {}

	markTask(task: Task){
		if(task.completed){
			return	task.completed = false;
		}
		if(!task.completed){
			return task.completed = true;
		}
		console.log('mark complete : ', task);
	}

	deleteTask(task: Task){
		console.log('delete : ', task);
	}

}
