import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
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

	login(user: string, password: string): Observable<boolean> {
		if(user === 'user' && password === 'password'){
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
