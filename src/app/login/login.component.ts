import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { 
	FormBuilder,
	FormGroup,
	Validators 
} from '@angular/forms';

import { Router } from '@angular/router';

export class Message {
	text: string;
	active: boolean;

	constructor(obj?: any) {
		this.text 		= obj && obj.text 		|| null;
		this.active		= obj && obj.active		|| null;
	}
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	form: FormGroup
	message: Message;

	constructor(
		public authService: AuthService,
		private formBuilder: FormBuilder,
		private router: Router
	) {
		this.form = formBuilder.group({
			'username' : ['', Validators.required],
			'password' : ['', Validators.required]
		})
		this.message = new Message({
			text : '',
			active : false
		});
	}

	login(username: string, password: string): void {
		
		this.message.text = '';
		this.message.active = false;
		
		this.authService
		.login(username, password)
		.subscribe(
			(): any => {
				if( this.authService.isLoggedIn() ){
					let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/todo';

					return this.router.navigate([redirect]);
				}

				this.message.text = "username or password incorrect";
				this.message.active = true;

			},
			(err) => {
				//catch error for when running auth against server
			},
			() => {}
		);
	}

	logout(): void {
		this.authService.logout();
		// return false;
	}



	ngOnInit() {
	}

}
