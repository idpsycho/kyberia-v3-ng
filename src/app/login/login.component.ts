import { Component, OnInit }	from '@angular/core';
import { Router }				from '@angular/router';

import { UserService }			from '../services/user.service';
import { AlertService }			from '../header.alert/alert.service';


@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['login.component.scss'],
})
export class LoginComponent {

	user = null;
	username = localStorage.getItem('lastLoginUsername') || 'ubik';
	password = 'heslo';
	loading = false;

	constructor(
		public userService: UserService,
		private alertService: AlertService,
		public router: Router,
	) { }

	login(): void {
		this.loading = true;
		this.userService
			.login(this.username, this.password)
			.subscribe( this.onLogin, this.onLogin );
	}

	onLogin = (json) => {
		this.loading = false;

		if (!json.success) {
			this.alertService.error('nepodarilo sa mi prihlasit :\'(');
			return;
		}

		localStorage.setItem('lastLoginUsername', this.username);
		this.user = json;
		this.alertService.clear();

		this.router.navigate([ '/mail' ]);
	}

}
