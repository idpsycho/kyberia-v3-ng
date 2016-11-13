import { Injectable }	from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { Observable }	from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { HOST, V3API_OPTIONS, extractJson } from '../../environments/environment';

@Injectable()
export class TopkService {

	constructor (private http: Http) {}

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
					event: 'K',
				},
				V3API_OPTIONS
			)
			.map(extractJson)
	}
}
