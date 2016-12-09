import { Component, Input }		from '@angular/core';
import { MailService }			from '../mail/mail.service';
import { UserService }			from '../_shared/user.service';

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
	userId = '';

	constructor(
		private mailService: MailService,
		private userService: UserService
	) {
		this.userId = this.userService.getId();
	}

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

		this.offsetContainer(this.areaSize + 10);

	}

	scrollMessages(){
		let container = document.getElementsByClassName("page-mail")[0];
		container.scrollTop = container.scrollHeight;
	}

	offsetContainer(height){
		document.getElementsByClassName("page-mail")[0].setAttribute("style", "bottom: " + (height) + "px");
	}

	updateUserMails = (userMails) => {
		this.mailText = '';
		this.userMails = userMails && userMails.mails;
	};

	resizeArea(){
		let fakeArea = document.getElementById("fakeArea");

		this.areaSize = (fakeArea.offsetHeight + 3);
		this.scrollMessages();

		this.offsetContainer(this.areaSize + 10);
	}

}