import { Injectable }						from '@angular/core';
import { Observable }						from 'rxjs/Observable';

import { UserService }						from '../_shared/user.service';
import { Httpv3 }							from '../_shared/_services/httpv3.service';

@Injectable()
export class TopkService {

	constructor (
		private httpv3: Httpv3,
	) {}

	///////////////////////////////////////////////////////////
	// actions
	getTopk(): Observable<Object> {

		return this.httpv3
			.get('/id/15')
	}
	giveK(id): Observable<Object> {

		return this.httpv3
			.post(
				'/id/'+id,
				{
					event:		'K',
				}
			)
	}
}
