import { Component, OnInit }	from '@angular/core';
import { Router }				from '@angular/router';

import { MailService }			from './mail.service';
import { UserService }			from '../services/user.service';



@Component({
	selector: 'mail',
	templateUrl: './mail.component.html',
	styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {

	mailTo = '';
	mailText = '';
	mails = [];
	mailUsers = [];
	user;
	clicked = false;

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
		this.mails = json.mails;

		if (!this.mails.length)
			return;

		this.mailTo = this.mails[0].mail_to_name;

		const mailsLength = this.mails.length;
		let tempUsersArr = [];
		for (let i = 0; i < mailsLength; i++) {
			if (this.user.userId == this.mails[i].mail_from) continue;
			if (!tempUsersArr[this.mails[i].mail_from]) {
				tempUsersArr[this.mails[i].mail_from] = [];
			}
			tempUsersArr[this.mails[i].mail_from].push(this.mails[i]);
		}
		tempUsersArr = tempUsersArr.map(user => {
			return {
				id: user[0].mail_from,
				name: user[0].mail_from_name,
				mails: user,
			}
		});

		tempUsersArr.forEach(user => {
			this.mailUsers.push(user);
		});
	}

	onMailSent = (json) => {
		this.mailText = '';

		this.getMails();
	}

	userSelected = (user) => {
		this.clicked = true;
	}
}
