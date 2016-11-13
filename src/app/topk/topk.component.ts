import { Component, OnInit, OnDestroy }	from '@angular/core';
import { Router, NavigationEnd }				from '@angular/router';

import { TopkService }			from './topk.service';
import { AlertService }			from '../header.alert/alert.service';
import { UserService }			from '../services/user.service';

@Component({
	selector: 'topk',
	templateUrl: './topk.component.html',
	styleUrls: ['./topk.component.css']
})
// export class TopkComponent {
export class TopkComponent implements OnDestroy {

	topkNodes = [];

	routeSubscription = null;

	constructor(
		private topkService: TopkService,
		private userService: UserService,
		private alertService: AlertService,
		private router: Router,
	) {
		if ( !userService.isLoggedIn() ) {
			router.navigate([ '/' ]);
			return;
		}

		// this.loadTopK();

		this.bindRouteRefresh(this.loadTopK);
	}


	///////////////////////////////////
	// actions

	loadTopK = () => {
		console.log('loadTopK');
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
		node._kGiven = true;
	}


	/////////////////////////////////////////////////////
	// toto sluzi na to, aby sa refreshovala routa

	ngOnDestroy() {
		this.unsubscribeRouteRefresh();
	}
	bindRouteRefresh(fn) {
		this.routeSubscription = this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				fn();
			}
		});
	}
	unsubscribeRouteRefresh() {
		if (!this.routeSubscription) return;

		this.routeSubscription.unsubscribe();
		this.routeSubscription = null;
	}

}
