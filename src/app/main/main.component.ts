import { Component }			from '@angular/core';
import { UserService }			from '../_shared/user.service';


@Component({
	selector: 'main',
	templateUrl: './main.component.html',
	styleUrls: ['main.component.scss']
})
export class MainComponent {

	constructor(public userService: UserService) { }

}
