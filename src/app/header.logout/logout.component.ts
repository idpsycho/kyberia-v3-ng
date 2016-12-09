import { Component, OnInit }	from '@angular/core';
import { Router }				from '@angular/router';

import { UserService }			from '../_shared/user.service';
import { AlertService }			from '../header.alert/alert.service';


@Component({
	selector: 'logout',
	templateUrl: './logout.component.html',
})
export class LogoutComponent {

	user = null;

	constructor(
		public userService: UserService,
		private alertService: AlertService,
		private router: Router,
	) { }

	logout(): void {
		this.userService
			.logout()
			.subscribe( this.onLogout, this.onLogout );
	}

	onLogout = (json) => {
		if (!json.success) {
			this.alertService.error('nepodarilo sa mi odhlasit :\'(');
			return;
		}

		this.user = null;

		this.router.navigate([ '/' ]);
	}

	userIsLoggedIn() {
		return this.user;
	}

}
