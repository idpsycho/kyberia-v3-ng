import { Injectable }	from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { Observable }	from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { HOST, V3API_OPTIONS } from '../../environments/environment';


@Injectable()
export class UserService {

	user = null;

	constructor (private http: Http) {}

	isLoggedIn = () => {
		return this.user;
	}

	getUser = () => {
		return this.user;
	}

	getId = () => {
		return this.user && this.user.userId;
	}

	getUserName = () => {
		if (!this.user)
			return '';

		return this.user.userName;
	}

	login(username, password): Observable<Object> {

		return this.http
			.post(
				HOST,
				{
					event:		'login',
					login:		username,
					password:	password,
					login_type:	'name',
				},
				V3API_OPTIONS
			)
			.map(this.extractJson)
			.map(this.setUserData)
	}

	logout(): Observable<Object> {

		return this.http
			.post(
				HOST,
				{
					event:		'logout',
				},
				V3API_OPTIONS
			)
			.map(this.extractJson)
			.map(this.setUserData)
	}

	extractJson(res: Response) {
		return res.json();
	}

	setUserData = (json) => {
		this.user = null;
		if (!json.userId)
			return json;

		this.user = {
			userId: json.userId,
			userName: json.userName,
		}
		return json;
	}



}
