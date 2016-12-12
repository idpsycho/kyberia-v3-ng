import {Component, Input} from '@angular/core';

@Component({
	selector: 'mail-users',
	templateUrl: './mail-users.component.html',
	styleUrls: ['mail-users.component.scss'],
})
export class MailUsersComponent {
	@Input() mapUsers;
	@Input() showThread;
}