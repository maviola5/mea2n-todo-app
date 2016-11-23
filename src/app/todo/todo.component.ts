import { Component, OnInit } from '@angular/core';
import { Message } from '../shared';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../shared';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})




export class TodoComponent implements OnInit {

	message: Message;
	todoListForm: FormGroup;
	newTaskForm: FormGroup;
	tasks: Task[];

	constructor(
		private formBuilder: FormBuilder
	) {
		this.tasks = [
			{
				id : '123',
				name : 'mow the lawn',
				completed : false

			}, {
				id : '234',
				name : 'take out the trash',
				completed : true
			}, {
				id : '674',
				name : 'do the laundry',
				completed : false
			}
		].map( item => {
			return new Task({
				id : item.id,
				name : item.name,
				completed : item.completed
			})
		});

		this.newTaskForm = formBuilder.group({
			'newTask' : ['']
		});

		this.message = new Message();
	
	}

	createTask(task: string): any {
		if(!task){
			return this.message = new Message({
				text : 'New task name required.',
				active: true
			});
		}
		console.log(task);

		let newTask = new Task({
			id: 'adfasdf',
			name: task
		});

		this.tasks.push(newTask);

		this.newTaskForm.reset();
	}

	updateForm(): any {
		console.log('updated');
	}

	ngOnInit() {
	}

}
