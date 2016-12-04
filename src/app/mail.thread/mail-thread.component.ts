import { Component, Input } from '@angular/core';
import { MailService } from '../mail/mail.service';

@Component({
	selector: 'mail-thread',
	templateUrl: './mail-thread.component.html',
	styleUrls: ['mail-thread.component.scss'],

})
export class MailThreadComponent {
	@Input() mailToUsername;
	@Input() goBack;
	mailText = '';
	userMails = [];
	areaSize = 27;

	constructor(private mailService: MailService) {}

	ngOnInit() {
		this.loadUserMails();
		console.log('userMails', this.userMails);

	}

	ngOnChanges() {
		this.loadUserMails();
		console.log('userMails', this.userMails);

	}

	send() {
		this.mailService
			.sendMail(this.mailToUsername, this.mailText)
			.subscribe( this.loadUserMails )
	}

	loadUserMails = () => {
		if (!this.mailToUsername) return;
		this.mailService
			.getUserMails(this.mailToUsername)
			.subscribe(this.updateUserMails);
	}

	updateUserMails = (userMails) => {
		this.mailText = '';
		this.userMails = userMails && userMails.mails;
	};

	resizeArea(){
		var fakeArea = document.getElementById("fakeArea");
		this.areaSize = (fakeArea.offsetHeight + 3);
	}

}