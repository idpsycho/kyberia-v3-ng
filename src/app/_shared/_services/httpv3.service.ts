import { Injectable }	from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }	from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { HOST } from '../../../environments/environment';


@Injectable()
export class Httpv3 {

	anticsrf = '';
	V3API_OPTIONS = this.v3api_options();

	constructor (private http: Http) {}


	// prida HOST k relativnej url
	// prida v3api header, extractne json
	// extractneJson
	get = (url, options?) => {

		url = url || '';

		if (!url.startsWith('http'))
			url = HOST + url;

		if (!options)
			options = this.V3API_OPTIONS;

		return this.http
			.get(url, options)
			.map(this.extractJson);
	}

	// prida HOST k relativnej url
	// prida v3api header, extractne json
	// prida anticsrf
	// extractneJson
	post = (url, params, options?) => {

		url = url || '';

		if (!url.startsWith('http'))
			url = HOST + url;

		if (params && !params.anticsrf && this.anticsrf)
			params.anticsrf = this.anticsrf;

		if (!options)
			options = this.V3API_OPTIONS;

		return this.http
			.post(url, params, options)
			.map(this.extractJson);
	}


	/////////////////////////////////////////////////////////////////
	// utils

	setAnticsrf = (anticsrf) => {
		this.anticsrf = anticsrf;
	}

	extractJson = (res: Response) => {
		return res.json();
	}

	v3api_options() {
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
