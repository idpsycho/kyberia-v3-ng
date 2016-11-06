import { Injectable }	from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { Observable }	from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class UserService {

	user = null;

	constructor (private http: Http) {}

	isLoggedIn = () => {
		return this.user;
	}
	getUserName = () => {
		if (!this.user)
			return '';

		return this.user.userName;
	}

	login(username, password): Observable<Object> {
		
		return this.http
			.post(
				'http://v3.brm.sk/',
				{
					event:		'login',
					login:		username,
					password:	password,
					login_type:	'name',
				},
				this.v3apioptions()
			)
			.map(this.extractJson)
			.map(this.setUserData)
	}

	logout(): Observable<Object> {
		
		return this.http
			.post(
				'http://v3.brm.sk/',
				{
					event:		'logout',
				},
				this.v3apioptions()
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

	v3apioptions() {
		let headers = new Headers({ 'v3api': 1 })
		let options = new RequestOptions({ headers: headers });
		return options;
	}

}
