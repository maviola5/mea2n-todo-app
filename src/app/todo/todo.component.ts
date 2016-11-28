import { Component, OnInit, EventEmitter } from '@angular/core';
import { Message } from '../shared';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Task } from '../shared';

import { TodoService } from '../services/todo.service';
import { AuthService } from '../services/auth.service';

import 'rxjs/add/operator/map';

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
		private formBuilder: FormBuilder,
		private todoService: TodoService,
		private authService: AuthService
	) {

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

		let _id = this.authService.getId();
		let name = task;

		this.todoService
		.createTask(_id, name)
		.subscribe(
			(res: any) => {
				this.tasks = res.tasks.map( item => {
					return new Task({
						id: item._id,
						name: item.name,
						completed: item.completed
					});
				});
			},
			(err) => {
				this.message = new Message({
					text : JSON.parse(err._body).message,
					active : true
				});
			},
			() => {
				console.log('done with create task');
			}
		);

		this.newTaskForm.reset();
	}

	updateTask(task: Task): any {
		
		this.message = new Message();

		let _id = this.authService.getId();
		let taskid = task.id;
		let completed = task.completed;

		this.todoService
		.updateTask(_id, taskid, completed)
		.subscribe(
			(res: any) => {
				this.tasks = res.tasks.map( item => {
					return new Task({
						id: item._id,
						name: item.name,
						completed: item.completed
					});
				})
			},
			(err: any) => {
				console.log(err);
				this.message = new Message({
					text: JSON.parse(err._body).message,
					active: true
				});
			},
			() => {
				console.log('done with update task');
			}
		);


	}
	
	deleteTask(task: Task): any {
		let _id = this.authService.getId();
		let taskid = task.id;

		this.message = new Message();

		this.todoService
		.deleteTask(_id, taskid)
		.subscribe(
			(res: any) => {
				this.tasks = res.tasks.map( item => {
					return new Task({
						id : item._id,
						name : item.name,
						completed : item.completed
					});
				})
			},
			(err: any) => {

				return this.message = new Message({
					text : JSON.parse(err._body).message,
					active : true
				});
			},
			() => {
				console.log('delete completed');
			}
		);
	}

	updateForm(): any {
		console.log('updated');
	}

	ngOnInit() {
		let _id = this.authService.getId();
		this.todoService
		.getTodo(_id)
		.subscribe(
			(res: any) => {
				// console.log(res);
				this.tasks = res.tasks.map( item => {
					return new Task({
						id: item._id,
						name: item.name,
						completed: item.completed
					});
				});
			},
			(err: any) => {
				// console.log(err);
				return this.message = new Message({
					text : JSON.parse(err._body).message,
					active : true
				});
			},
			() => {
				console.log('done with init');
			}
		);
	}

}
