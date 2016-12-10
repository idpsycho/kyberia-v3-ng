import { Injectable }			from '@angular/core';
import { Observable }			from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Httpv3 }				from './_services/httpv3.service';


@Injectable()
export class UserService {

	user = null;

	constructor (
		private httpv3: Httpv3,
	) {}

	isLoggedIn = () => {
		return this.user;
	}

	getUser = () => {
		return this.user;
	}

	getId = () => {
		return this.user && this.user.userId;
	}

	getAnticsrf = () => {
		return this.user && this.user.anticsrf;
	}

	getUserName = () => {
		if (!this.user)
			return '';

		return this.user.userName;
	}

	login(username, password): Observable<Object> {

		return this.httpv3
			.post(
				'',
				{
					event:		'login',
					login:		username,
					password:	password,
					login_type:	'name',
				}
			)
			.map(this.setUserData)
	}

	logout(): Observable<Object> {

		return this.httpv3
			.post(
				'',
				{
					event:		'logout',
				},
			)
			.map(this.setUserData)
	}

	setUserData = (json) => {
		if (!json.userId) {

			this.httpv3.setAnticsrf('');
			this.user = null;
		}
		else {

			this.httpv3.setAnticsrf(json.anticsrf);

			this.user = {
				userId:		json.userId,
				userName:	json.userName,
				anticsrf:	json.anticsrf,
			}
		}
		return json;
	}



}
