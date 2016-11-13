import { Component, OnInit }		from '@angular/core';
import { Router }					from '@angular/router';


@Component({
	selector: 'app-v3',
	templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

	constructor(
		private router: Router,
	) {}

	ngOnInit() {
		// akosi to nefunguje, snazim sa aby sa appka vzdy po otvoreni resetla, ale asi na to inak treba
		// this.router.navigate([ '/' ]);
	}

}
