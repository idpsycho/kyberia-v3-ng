import { Injectable }			from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { Observable }			from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { UserService }			from '../_shared/user.service';
import { HOST, V3API_OPTIONS }	from '../../environments/environment';

@Injectable()
export class MailService {

	constructor (
		private http: Http,
		private userService: UserService,
	) {}

	sendMail(mailTo, mailText): Observable<Object> {
		return this.http
			.post(
				HOST,
				{
					mail_to:		mailTo,
					mail_text:		mailText,
					event:			'send',
					mail_to_type:	'name',
					anticsrf:		this.userService.getAnticsrf(),
				},
				V3API_OPTIONS
			)
			.map(this.extractJson)
	}

	getMailData(): Observable<Object> {

		return this.http
			.get(
				HOST+'/id/24',
				V3API_OPTIONS
			)
			.map(this.extractJson)
	}

	extractJson(res: Response) {
		return res.json();
	}

	getUserMails(mailToUsername) {
		console.log('mailToUsername', mailToUsername);

		return this.getMails().map(function(mapUsers) {
			console.log('sdasd');

			return mapUsers[mailToUsername];
		});
	}

	getMails() {
		return this.getMailData().map(this.processUsersMails);
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
			if (mails.length === 0) {
				mails.push([mail] );
			} else {
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
