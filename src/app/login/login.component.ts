import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { 
	FormBuilder,
	FormGroup,
	Validators 
} from '@angular/forms';

import { Router } from '@angular/router';
import { Message } from '../shared';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	form: FormGroup;
	message: Message;

	constructor(
		public authService: AuthService,
		private formBuilder: FormBuilder,
		private router: Router
	) {
		this.form = formBuilder.group({
			'username' : ['', Validators.required],
			'password' : ['', Validators.required]
		});
		this.message = new Message();
	}

	login(params: { username?: string, password?: string }): any {
		
		if(!params.username && !params.password){
			return this.message = new Message({
				text: 'Username and Password are required.',
				active: true
			})
		}

		if(!params.username){
			return this.message = new Message({
				text : 'Username is required.',
				active : true
			})
		}
		if(!params.password){
			return this.message = new Message({
				text: 'Password is required.',
				active: true
			})
		}

		this.message = new Message();
		
		this.authService
		.login(params.username, params.password)
		.subscribe(
			(): any => {
				if( this.authService.isLoggedIn() ){
					let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/todo';

					return this.router.navigate([redirect]);
				}

				this.message = new Message({
					text : 'Username and password combination incorrect.',
					active : true
				});
			},
			(err) => {
				//catch error for when running auth against server
			},
			() => {}
		);
	}

	logout(): void {
		this.authService.logout();
	}

	ngOnInit() {}

}
