import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'userIdToAvatarSrc'})
export class UserIdToAvatarSrcPipe implements PipeTransform {

	transform(value, args:string[]) : any {
		var id = '' + value;

		var src = 'https://kyberia.sk/images/nodes/';
		src += id[0] + '/';
		src += id[1] + '/';
		src += id + '.gif';

		return src;
	}

}