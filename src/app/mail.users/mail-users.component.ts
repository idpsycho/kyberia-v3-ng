import {Component, Input} from '@angular/core';

@Component({
	selector: 'mail-users',
	templateUrl: './mail-users.component.html',
})
export class MailUsersComponent {
	@Input() mapUsers;
	@Input() showThread;

	 mapToArr = (map) => {
		let arr = [];
		for (var key in map) {
			arr.push( map[key] );
		}
		return arr;
	}
}