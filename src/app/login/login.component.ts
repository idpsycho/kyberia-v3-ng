import { Component, OnInit }	from '@angular/core';
import { Router }				from '@angular/router';

import { UserService }			from '../_shared/user.service';
import { AlertService }			from '../header.alert/alert.service';


@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['login.component.scss'],
})
export class LoginComponent {

	user = null;
	username = localStorage.getItem('lastLoginUsername') || '';
	password = '';
	loading = false;

	constructor(
		public userService: UserService,
		private alertService: AlertService,
		public router: Router,
	) {
		if (this.isDevUser())
			this.password = 'heslo';
	}

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
			alert( JSON.stringify(json) );
			return;
		}

		localStorage.setItem('lastLoginUsername', this.username);
		this.user = json;
		this.alertService.clear();

		this.router.navigate([ '/mail' ]);
	}

	isDevUser = () => {
		var name = (this.username || '').toLowerCase();
		return ['psycho', 'lakerko', 'miyamoto'].indexOf(name) != -1;
	}

}
