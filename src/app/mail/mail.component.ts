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
	}
	onMailSent = (json) => {
		this.mailText = '';

		this.getMails();
	}
}
