import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';


@Component({
	selector: 'login',
	templateUrl: './login.component.html',
})
export class LoginComponent {

	user = null;
	username = 'ubik';
	password = '...';
	error = '';

	constructor(public userService: UserService) { }

	login(): void {
		this.userService
			.login(this.username, this.password)
			.subscribe( this.onLogin, this.onLogin );
	}

	onLogin = (json) => {
		if (!json.success) {
			this.error = 'nepodarilo sa mi prihlasit :\'(';
			return;
		}

		this.user = json;
		this.error = '';
	}

}
