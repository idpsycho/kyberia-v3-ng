import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { MainComponent }  from './main/main.component';
import { MailComponent }  from './mail/mail.component';
import { TopkComponent }  from './topk/topk.component';


@NgModule({
	imports: [
		RouterModule.forRoot([
			{ path: '',			component: MainComponent },
			{ path: 'mail',		component: MailComponent },
			{ path: 'topk',		component: TopkComponent }
		])
	],
	exports: [
		RouterModule
	]
})
export class AppRouting {}
