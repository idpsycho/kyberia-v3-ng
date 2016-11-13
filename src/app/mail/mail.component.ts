import { Component, OnInit, OnDestroy }	from '@angular/core';
import { Router, NavigationEnd }				from '@angular/router';
import { KeysPipe } 			from '../filters/keys.pipe';

import { MailService }			from './mail.service';
import { UserService }			from '../services/user.service';




@Component({
	selector: 'mail',
	templateUrl: './mail.component.html',
	styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnDestroy {

	mailTo = '';
	mailText = '';
	mailUsers;
	user = null;
	selectedUser = null;
	loaded = false;
	arrMailUsers = [];

	routeSubscription = null;

	constructor(
		private mailService: MailService,
		private userService: UserService,
		private router: Router,
	) {
		// console.log('MailComponent constructor');

		if ( !userService.isLoggedIn() ) {
			router.navigate([ '/' ]);
			return;
		}

		this.user = userService.getUser();

		// this.getMails();

		this.bindRouteRefresh(this.getMails);
	}


	/////////////////////////////////////////////////////
	// actions

	getMails = () => {
		console.log('getMails');
		this.mailService
			.getMails()
			.subscribe( this.updateMails )
	}

	send = () => {
		this.mailService
			.sendMail(this.mailTo, this.mailText)
			.subscribe( this.updateMailSent )
	}

	selectUser = (user) => {
		if (!user) {
			this.selectedUser = null;
			this.arrMailUsers = [];
			this.mailTo = '';
			return;
		}

		this.selectedUser = user.key;
		this.createUserMaillArr();

		this.mailTo = this.getName(user.key, user.value[0]);
	}

	///////////////////////////////////////////////////
	// updates

	updateMails = (json) => {
		const mails = json.mails;

		if (!mails || !mails.length || !this.user)
			return;

		this.mailTo = mails[0].mail_to_name;

		let tempUsers = [];
		mails.forEach(mail => {
			if (this.user.userId == mail.mail_from) {
				if (!tempUsers[mail.mail_to]) {
					tempUsers[mail.mail_to] = [];
				}
				tempUsers[mail.mail_to].push(mail);
			} else {
				if (!tempUsers[mail.mail_from]) {
					tempUsers[mail.mail_from] = [];
				}
				tempUsers[mail.mail_from].push(mail);
			}
		});
		this.mailUsers = this.mapToArr(tempUsers);
		if (this.selectedUser) {
			this.createUserMaillArr();
		}
		this.loaded = true;
	}

	updateMailSent = (json) => {
		this.mailText = '';
		this.loaded = false;
		this.getMails();
	}


	/////////////////////////////////////////////////
	// helpers

	mapToArr = (map) => {
		let arr = [];
		for (var key in map) {
			arr.push( {key: key, value: map[key]} );
		}
		return arr;
	}

	getName = (id, data) => {
		if (id === data.mail_from) return data.mail_from_name;
		if (id === data.mail_to) return data.mail_to_name;
		return 'anonym';
	}

	createUserMaillArr = () => {
		this.arrMailUsers = this.mailUsers.filter(mail => { return mail.key == this.selectedUser})[0].value;
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
