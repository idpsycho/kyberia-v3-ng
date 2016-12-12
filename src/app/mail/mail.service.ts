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

	getMailUsers(): Observable<Object> {
		return this.httpv3
			.get('/v3api/endpoints/mail-users.php');
	}

	getMailThread(userName): Observable<Object> {
		return this.httpv3
			.get(`/v3api/endpoints/mail-thread.php?name=${userName}`);
	}
}
