import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router }				from '@angular/router';
import { UserService }			from '../_shared/user.service';


@Component({
	selector: 'header-v3',
	templateUrl: './header.component.html',
	styleUrls: ['header.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {

	constructor(
		public userService: UserService,
		private router: Router,
	) { }

	loggedIn = () => {
		return this.userService.isLoggedIn();
	}

	goTo = (route) => {
		this.router.navigate([ route ]);
	}
}
