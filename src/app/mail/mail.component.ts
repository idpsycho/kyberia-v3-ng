import { Component, OnInit, OnDestroy }	from '@angular/core';
import { Router, NavigationEnd }		from '@angular/router';

import { KeysPipe } 					from '../_shared/_pipes/keys.pipe';
import { MailService }					from './mail.service';
import { UserService }					from '../_shared/user.service';

@Component({
	selector: 'mail',
	templateUrl: './mail.component.html',
	styleUrls: ['../../assets/sass/_variables.scss', 'mail.component.scss'],
})
export class MailComponent implements OnDestroy {
	mapUsers = [];
	userMails = [];
	mailToUsername = '';
	mailToUserId = '';
	controller = {};
	checkMailInterval;

	constructor(
		private mailService: MailService,
		private userService: UserService,
		private router: Router,
	) {
		if ( !userService.isLoggedIn() ) {
			router.navigate([ '/' ]);
			return;
		}

		this.startCheckMailInterval();
		this.bindRouteRefresh(this.loadMails);
	}

	showThread = (userName, userId) => {
		const user = this.mapUsers[userId];
		this.mailToUsername = userName;
		this.userMails = user && user.mails;
		clearInterval(this.checkMailInterval);
	}

	goBack = () => {
		this.mailToUsername = '';
		this.loadMails();
		this.startCheckMailInterval();

		document.getElementsByClassName("page-mail")[0].setAttribute("style", "bottom: 0px");
	}

	loadMails = () => {
		this.mailService
			.getMailUsers()
			.subscribe((json: any) => { this.mapUsers = json.mailUsers; });
	}

	createThread = (mailToUsername) => {
		this.mailToUsername = mailToUsername;
	}

	checkNewMail() {
		this.mailService
			.checkNewMail()
			.subscribe((json: any) => {
				if (parseInt(json.data) != 0) {
					this.loadMails();
				}
			});
	}

	startCheckMailInterval() {
		this.checkMailInterval = setInterval(() => {
			this.checkNewMail();
		}, 30000);
	}

	/////////////////////////////////////////////////////
	// toto sluzi na to, aby sa refreshovala routa - potom to refaktorneme na decorator

	routeSubscription = null;

	ngOnDestroy() {
		clearInterval(this.checkMailInterval);
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
