import { Injectable, Inject } from '@angular/core';
import { 
	Http, 
	Response, 
	Headers, 
	RequestOptions, 
	Request, 
	RequestMethod} from '@angular/http';
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
			method : RequestMethod.Post,
			headers : headers,
			body: body
		});

		return this.http.request(url, options).map((res: Response) => res.json());

	}

	login(username: string, password: string): Observable<any[]> {

		let url: string = `${this.authUrl}login`;

		let headers = new Headers({
			'content-type' : 'application/x-www-form-urlencoded'
		});

		let body: string = `email=${username}&password=${password}`;

		let options: RequestOptions = new RequestOptions({
			method : RequestMethod.Post,
			headers : headers,
			body: body
		});

		return this.http.request(url, options).map((res: Response) => res.json());
	}

	logout(): void {
		localStorage.removeItem('special-sauce');
		localStorage.removeItem('user-sauce');
		localStorage.removeItem('id-sauce');
	}

	setId(id: string): void {
		localStorage.setItem('id-sauce', id);
	}

	getId(): any {
		return localStorage.getItem('id-sauce');
	}

	setUser(username: string): void {
		localStorage.setItem('user-sauce', username);
	}

	getUser(): any {
		return localStorage.getItem('user-sauce');
	}

	setToken(token: string): void {
		localStorage.setItem('special-sauce', token);
	}

	getToken(): any {
		return localStorage.getItem('special-sauce');
	}

	isLoggedIn(): boolean {
		let token = this.getToken();

		if(token !== null){
			//get payload from JWT -> decode -> JSON
			let payload = JSON.parse(window.atob(token.split('.')[1]));
			//prep for compare
			let exp = new Date();
			exp.setMilliseconds(payload.exp);
			let now = new Date();
			//compare exp with now
			if(exp < now){
				this.logout();
				return false
			}
			this.setUser(payload.name);
			this.setId(payload._id);
			return true			
		}
		return false;
	}
}

export var AUTH_PROVIDERS: Array<any> = [
	{ provide: AuthService, useClass: AuthService },
	{ provide: TODO_AUTH_API_URL, useValue: TODO_AUTH_API_URL }
];
