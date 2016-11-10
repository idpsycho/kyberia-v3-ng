import { Injectable }	from '@angular/core';


@Injectable()
export class AlertService {

	alertMessage = '';

	constructor () {}

	getAlert = () => {
		return this.alertMessage;
	}

	alert = (msg) => {
		this.alertMessage = msg;
	}

	clear = () => {
		this.alertMessage = '';
	}

}
