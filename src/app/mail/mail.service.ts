import { Injectable }	from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { Observable }	from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { UserService }			from '../services/user.service';
import { HOST, V3API_OPTIONS } from '../../environments/environment';


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

	getMails(): Observable<Object> {
		
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

}
