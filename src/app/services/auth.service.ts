import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions, Request } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';


export var TODO_AUTH_API_URL: string = 'http://localhost:3000/api/';

@Injectable()
export class AuthService {

	// isLoggedIn: boolean = false;
	redirectUrl: string;
	

	constructor(
		private http: Http,
		@Inject(TODO_AUTH_API_URL) private authUrl: string
	){}


	register(params : {
		name?: string,
		email?: string,
		password?: string,
		repassword?: string
	}): Observable<any[]> {

		let url: string = `${this.authUrl}register`;

		let headers = new Headers({
			'content-type' : 'application/x-www-form-urlencoded'
		});

		let body: string = `name=${params.name}&email=${params.email}&password=${params.password}&repassword=${params.repassword}`;

		let options: RequestOptions = new RequestOptions({
			method : 'post',
			headers : headers,
			body: body
		});

		return this.http.request(url, options).map((res: Response) => res.json());

	}






	login(user: string, password: string): Observable<boolean> {
		if(user === 'user@user' && password === 'password'){
			localStorage.setItem('username', user);
			return Observable.of(true);
		}
		return Observable.of(false);
	}

	logout(): any {
		localStorage.removeItem('username');
	}

	getUser(): any {
		return localStorage.getItem('username');
	}

	isLoggedIn(): boolean {
		return this.getUser() !== null;
	}

}

export var AUTH_PROVIDERS: Array<any> = [
	{ provide: AuthService, useClass: AuthService },
	{ provide: TODO_AUTH_API_URL, useValue: TODO_AUTH_API_URL }
];
