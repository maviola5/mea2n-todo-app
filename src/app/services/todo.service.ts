import { Injectable, Inject } from '@angular/core';
import { 
	Http, 
	Response, 
	Headers, 
	RequestOptions, 
	Request, 
	RequestMethod
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthService } from './auth.service';

export var TODO_API_URL: string = 'http://localhost:3000/api/';

@Injectable()
export class TodoService {

	constructor(
		private http: Http,
		private authService: AuthService,
		@Inject(TODO_API_URL) private todoUrl: string
	) {}

	getTodo(userid: string): Observable<any[]>{

		let url: string = `${this.todoUrl}todo/${userid}`;

		let headers: Headers = new Headers({
			'Authorization' : `Bearer ${this.authService.getToken()}`
		});

		let options: RequestOptions = new RequestOptions({
			method : RequestMethod.Get,
			headers: headers,
			withCredentials: true
		});

		return this.http.get(url, options).map((res: Response) => res.json());
	}

	createTask(userid: string, name: string ): Observable<any[]>{

		let url: string = `${this.todoUrl}todo/${userid}/task`;

		let headers: Headers = new Headers({
			'Authorization' : `Bearer ${this.authService.getToken()}`,
			'content-type' : 'application/x-www-form-urlencoded'
		});

		let body: string = `name=${name}`;

		let options: RequestOptions = new RequestOptions({
			method: RequestMethod.Post,
			headers: headers,
			withCredentials: true,
			body : body
		});

		return this.http.get(url, options).map((res: Response) => res.json());
	}

	updateTask(userid: string, taskid: string, completed: boolean): Observable<any[]> {
		let url: string = `${this.todoUrl}todo/${userid}/task/${taskid}`;

		let headers: Headers = new Headers({
			'Authorization' : `Bearer ${this.authService.getToken()}`,
			'content-type' : 'application/x-www-form-urlencoded'
		});	

		let body: string = `completed=${completed}`;

		let options: RequestOptions = new RequestOptions({
			method: RequestMethod.Put,
			headers : headers,
			body : body,
			withCredentials : true
		});

		return this.http.request(url, options).map((res: any) => res.json());
	}

	deleteTask(userid: string, taskid: string): Observable<any[]> {
		let url: string = `${this.todoUrl}todo/${userid}/task/${taskid}`;

		let headers = new Headers({
			'Authorization' : `Bearer ${this.authService.getToken()}`
		});

		let options: RequestOptions = new RequestOptions({
			method: RequestMethod.Delete,
			headers: headers,
			withCredentials: true
		});

		return this.http.request(url, options).map((res: any) => res.json());
	}
}

export var TODO_PROVIDERS: Array<any> = [
	{ provide: TodoService, useClass: TodoService },
	{ provide: TODO_API_URL, useValue: TODO_API_URL }
];