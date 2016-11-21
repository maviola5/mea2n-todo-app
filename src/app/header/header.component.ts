import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	toggleNav: boolean = false;

	constructor() { }

	ngOnInit() {
	}

}
