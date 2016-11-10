import { Component, OnInit } from '@angular/core';
import { Router }			from '@angular/router';

import { AlertService }		from './alert.service';


@Component({
	selector: 'site-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.css'],
})
export class AlertComponent {

	constructor(
		public alertService: AlertService,
	) { }

}
