import { NgModule }			from '@angular/core';
import { RouterModule }		from '@angular/router';

import { MainComponent }	from './main/main.component';
import { LoginComponent }	from './login/login.component';
import { MailComponent }	from './mail/mail.component';
import { TopkComponent }	from './topk/topk.component';


@NgModule({
	imports: [
		RouterModule.forRoot([
			{ path: '',			component: LoginComponent },
			// { path: 'login',	component: LoginComponent },
			{ path: 'mail',		component: MailComponent },
			{ path: 'topk',		component: TopkComponent }
		])
	],
	exports: [
		RouterModule
	]
})
export class AppRouting {}
