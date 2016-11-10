import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { UserService } from '../services/user.service';


@Component({
	selector: 'header-v3',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
	encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {

	constructor(public userService: UserService) { }

	loggedIn = () => {
		return this.userService.isLoggedIn();
	}
}
