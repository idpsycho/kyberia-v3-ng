// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

import { Headers, RequestOptions, Response } from '@angular/http';

let v3api_options = () => {
	let headers = new Headers({
		'v3api': 1,
	})
	let options = new RequestOptions({
		headers:			headers,
		withCredentials:	true,
	});
	return options;
}


export const environment = {
	production: false,
};

export const HOST = 'http://v3api.brm.sk';
// export const HOST = 'http://v3api';

export const V3API_OPTIONS = v3api_options();

export const extractJson = (res: Response) => {
	return res.json();
}

