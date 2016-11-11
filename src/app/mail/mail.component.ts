import { Component, OnInit }	from '@angular/core';
import { Router }				      from '@angular/router';

import { MailService }				from './mail.service';
import { UserService }				from '../services/user.service';

import {KeysPipe} 						from '../filters/keys.pipe';



@Component({
	selector: 'mail',
	templateUrl: './mail.component.html',
	styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {

	mailTo = '';
	mailText = '';
	mailUsers = {};
	user = null;
	selectedUser = false;
	loaded = false;

	constructor(
		private mailService: MailService,
		private userService: UserService,
		private router: Router,
	) { }

	ngOnInit() {
		if ( !this.userService.isLoggedIn() ) {
			this.router.navigate([ '/' ]);
			return;
		}
		this.user = this.userService.getUser();

		this.getMails();
	}

	getMails = () => {
		this.mailService
			.getMails()
			.subscribe( this.onGotMails )
	}

	send = () => {
		this.mailService
			.sendMail(this.mailTo, this.mailText)
			.subscribe( this.onMailSent )
	}

	onGotMails = (json) => {
		const mails = json.mails;

		if (!mails.length)
			return;

		this.mailTo = mails[0].mail_to_name;

		let tempUsers = [];
		console.log('this.user.userId', this.user.userId);
		mails.forEach(mail => {
			console.log('mail.mail_from', mail.mail_from, this.user.userId == mail.mail_from);

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
		console.log('this.mailUsers', this.mailUsers);


		this.loaded = true;
	}

	onMailSent = (json) => {
		this.mailText = '';

		this.getMails();
	}

	selectUser = (user) => {
		console.log('user', user);

		this.selectedUser = user;
		this.mailTo = this.getName(user.key, user.value[0]);
	}

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
}
