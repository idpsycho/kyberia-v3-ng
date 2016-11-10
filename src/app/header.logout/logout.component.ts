import { Component, OnInit } from '@angular/core';
import { Router }			from '@angular/router';

import { UserService }		from '../services/user.service';


@Component({
	selector: 'logout',
	templateUrl: './logout.component.html',
})
export class LogoutComponent {

	user = null;
	error = '';

	constructor(
		public userService: UserService,
		private router: Router,
	) { }

	logout(): void {
		this.userService
			.logout()
			.subscribe( this.onLogout, this.onLogout );
	}

	onLogout = (json) => {
		if (!json.success) {
			this.error = 'nepodarilo sa mi odhlasit :\'(';
			return;
		}

		this.user = null;
		this.error = '';

		this.router.navigate([ '/' ]);
	}

	userIsLoggedIn() {
		return this.user;
	}

}
