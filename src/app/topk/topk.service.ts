import { Injectable }						from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }						from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { UserService }						from '../_shared/user.service';
import { HOST, V3API_OPTIONS, extractJson }	from '../../environments/environment';

@Injectable()
export class TopkService {

	constructor (
		private http: Http,
		private userService: UserService,
	) {}

	///////////////////////////////////////////////////////////
	// actions
	getTopk(): Observable<Object> {

		return this.http
			.get(
				HOST+'/id/15',
				V3API_OPTIONS
			)
			.map(extractJson)
	}
	giveK(id): Observable<Object> {

		return this.http
			.post(
				HOST+'/id/'+id,
				{
					event:		'K',
					anticsrf:	this.userService.getAnticsrf(),
				},
				V3API_OPTIONS
			)
			.map(extractJson)
	}
}
