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
	checkMailInterval;

	constructor(
		private mailService: MailService,
		private userService: UserService
	) {
		this.userId = this.userService.getId();
	}

	ngOnChanges() {
		this.userMails = [];
		this.loadUserMails();
		// ugly ass condition

		if (this.mailToUsername && (!this.checkMailInterval || (this.checkMailInterval && this.checkMailInterval.runCount == -1))) {
			this.startCheckMailInterval();
		}
	}

	send() {
		this.mailService
			.sendMail(this.mailToUsername, this.mailText)
			.subscribe( this.loadUserMails )
	}

	loadUserMails = () => {
		if (!this.mailToUsername) return;
		this.mailService
			.getMailThread(this.mailToUsername)
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

		const mailResponse = userMails && userMails.userMails;
		let tempMailArr = [];
		for (let i = 0; i < mailResponse.length; i++) {
			if (tempMailArr.length === 0) {
				tempMailArr.push([ mailResponse[i] ]);
			} else {
				if (tempMailArr[tempMailArr.length - 1][0].mail_to === mailResponse[i].mail_to) {
					tempMailArr[tempMailArr.length - 1].push(mailResponse[i]);
				} else {
					tempMailArr.push([ mailResponse[i] ]);
				}
			}
		}
		this.userMails = tempMailArr;
	};

	resizeArea(){
		let fakeArea = document.getElementById("fakeArea");

		this.areaSize = (fakeArea.offsetHeight + 3);
		this.scrollMessages();

		this.offsetContainer(this.areaSize + 10);
	}

	checkNewMail() {
		this.mailService
			.checkNewMail()
			.subscribe((json: any) => {
				if (parseInt(json.data) != 0 && json.data.split(";")[1] === this.mailToUsername) {
					this.loadUserMails();
				}
			});
	}

	startCheckMailInterval() {
		this.checkMailInterval = setInterval(() => {
			this.checkNewMail();
		}, 30000);
	}

	callGoBack() {
		clearInterval(this.checkMailInterval);
		this.goBack();
	}

}