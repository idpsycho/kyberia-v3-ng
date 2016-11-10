import { Injectable }	from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { Observable }	from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class TopkService {

	constructor (private http: Http) {}

	getTopk(): Observable<Object> {

		return this.http
			.get(
				'http://v3.brm.sk/id/15',
				this.v3apioptions()
			)
			.map(this.extractJson)
	}

	extractJson(res: Response) {
		return res.json();
	}

	v3apioptions() {
		let headers = new Headers({
			'v3api': 1,
		})
		let options = new RequestOptions({
			headers:			headers,
			withCredentials:	true,
		});
		return options;
	}

}
