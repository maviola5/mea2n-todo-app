import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
	host : {
		'class' : 'header'
	}
})
export class HeaderComponent implements OnInit {
	toggleNav: boolean = false;

	constructor(
		private authService: AuthService,
		private router: Router
	) {}

	ngOnInit() {}

	showLogin(): boolean{
		return this.authService.isLoggedIn();
	}

	user(): any {
		return this.authService.getUser();
	}

	logout() {
		this.authService.logout();
		this.router.navigate(['/login']);
	}

}
