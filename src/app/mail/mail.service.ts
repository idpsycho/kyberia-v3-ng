import { Injectable }			from '@angular/core';
import { Observable }			from 'rxjs/Observable';

import { UserService }			from '../_shared/user.service';
import { Httpv3 }				from '../_shared/_services/httpv3.service';

@Injectable()
export class MailService {

	constructor (
		private httpv3: Httpv3,
		private userService: UserService,
	) {}

	sendMail(mailTo, mailText): Observable<Object> {
		return this.httpv3
			.post(
				'',
				{
					mail_to:		mailTo,
					mail_text:		mailText,
					event:			'send',
					mail_to_type:	'name',
				},
			)
	}

	getMailData(): Observable<Object> {

		return this.httpv3
			.get('/id/24')
	}

	getUserMails(mailToUsername) {
		return this.getMails().map(function(mapUsers) {

			return mapUsers[mailToUsername];
		});
	}

	getMails() {
		return this.getMailData()
			.map(this.processUsersMails);
	}

	processUsersMails = (json) => {
		let mapUsers = [];
		let myUserId = this.userService.getId();
		json.mails.forEach( mail => {
			let otherUserId;
			let otherUserName;

			if (mail.mail_to == myUserId) {
				otherUserId = mail.mail_from;
				otherUserName = mail.mail_from_name;
			} else {
				otherUserId = mail.mail_to;
				otherUserName = mail.mail_to_name;
			}

			if (!mapUsers[otherUserName]) {
				mapUsers[otherUserName] = {
					mails: [],
					userId: otherUserId,
					userName: otherUserName
				};
			}
			let mails = mapUsers[otherUserName].mails;
			if (!mails.length) {
				mails.push([mail] );
			}
			else {
				if (mails[mails.length - 1][0].mail_to === mail.mail_to) {
					mails[mails.length - 1].push(mail);
				} else {
					mails.push([mail] );
				}
			}

			// mapUsers[otherUserName].mails.push( mail );
		});

		console.log('mapUsers', mapUsers);


		return mapUsers;
	}

}
