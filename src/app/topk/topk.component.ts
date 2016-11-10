import { Component, OnInit }	from '@angular/core';
import { Router }				from '@angular/router';

import { TopkService }			from './topk.service';

@Component({
	selector: 'topk',
	templateUrl: './topk.component.html',
	styleUrls: ['./topk.component.css']
})
export class TopkComponent implements OnInit {

	topkNodes = [];

	constructor(
		private topkService: TopkService,
	) { }

	ngOnInit() {
		this.topkService
			.getTopk()
			.subscribe(this.reduceTopk)
	}

	reduceTopk = (json) => {
		if (!json.topk)
			return;

		this.topkNodes = json.topk;
	}
}
