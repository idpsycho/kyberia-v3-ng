import { Component, OnInit }	from '@angular/core';
import { Router }				from '@angular/router';

import { UserService }			from '../services/user.service';

@Component({
	selector: 'topk',
	templateUrl: './topk.component.html',
	styleUrls: ['./topk.component.css']
})
export class TopkComponent implements OnInit {

	constructor(
		private userService: UserService,
		private router: Router,
	) { }

	ngOnInit() {
		if ( !this.userService.isLoggedIn() ) {
			this.router.navigate([ '/' ]);
			return;
		}
	}

}
