import { Component } from '@angular/core';
import { UserService } from './services/user.service';


@Component({
	selector: 'app-v3',
	templateUrl: './app.component.html',
	providers: [UserService],
})
export class AppComponent {
	title = 'Kyberia v3 app';
}
