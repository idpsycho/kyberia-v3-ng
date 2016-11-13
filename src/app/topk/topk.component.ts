import { Component, OnInit }	from '@angular/core';
import { Router }				from '@angular/router';

import { TopkService }			from './topk.service';
import { AlertService }			from '../header.alert/alert.service';
import { UserService }			from '../services/user.service';

@Component({
	selector: 'topk',
	templateUrl: './topk.component.html',
	styleUrls: ['./topk.component.css']
})
export class TopkComponent implements OnInit {

	topkNodes = [];

	constructor(
		private topkService: TopkService,
		private userService: UserService,
		private alertService: AlertService,
		private router: Router,
	) { }

	ngOnInit() {
		if ( !this.userService.isLoggedIn() ) {
			this.router.navigate([ '/' ]);
			return;
		}

		this.loadTopK();
	}


	///////////////////////////////////
	// actions
	loadTopK = () => {
		this.topkService
			.getTopk()
			.subscribe(this.updateTopk)
	}
	giveK = (node) => {
		this.topkService
			.giveK(node.node_id)
			.subscribe(
				(json) => { this.updateGivenK(json, node) },
				(json) => { this.updateGivenK(json, node) }
			)
	}


	///////////////////////////////////////
	// updaters
	updateTopk = (json) => {
		if (!json.topk)
			return;

		this.topkNodes = json.topk;
	}
	updateGivenK = (json, node) => {
		if (!json.success) {
			this.alertService.error('nepodarilo sa dat kacko');
			return;
		}

		node.k++;
	}
}
