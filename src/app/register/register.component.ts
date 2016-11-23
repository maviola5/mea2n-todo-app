import { Component, OnInit } from '@angular/core';
import { 
	FormBuilder, 
	FormGroup, 
	Validators 
} from '@angular/forms';
import { Message } from '../shared';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	message: Message;
	form: FormGroup;

	constructor(
		private authService: AuthService,
		private formBuilder: FormBuilder
	) {
		this.form = formBuilder.group({
			'name' : ['', Validators.required],
			'email' : ['', Validators.required],
			'password' : ['', Validators.required],
			'repassword' : ['', Validators.required]
		});

		this.message = new Message();

	}

	register(params: {
		name?: string, 
		email?: string, 
		password?: string, 
		repassword?: string 
	}): any {

		if(!params){
			return this.message = new Message({
				text : 'all fields required.',
				active : true
			});
		}

		if(!params.name){
			return this.message = new Message({
				text : 'Username is required.',
				active : true
			});
		}
		if(!params.email){
			return this.message = new Message({
				text : 'Email is required.',
				active : true
			});
		}
		if(!params.password){
			return this.message = new Message({
				text : 'Password is required.',
				active : true
			});
		}	
		if(!params.repassword){
			return this.message = new Message({
				text : 'You must enter re-enter your password.',
				active: true
			});
		}

		return this.message = new Message({
			text: 'Good job, Great show',
			active: true
		});
	}

	ngOnInit() {
	}

}
