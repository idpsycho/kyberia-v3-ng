import { BrowserModule }		from '@angular/platform-browser';
import { NgModule }					from '@angular/core';
import { FormsModule }			from '@angular/forms';
import { HttpModule }				from '@angular/http';

import { AppRouting }				from './app.routing';

// services
import { AlertService }			from './header.alert/alert.service';
import { UserService }			from './services/user.service';
import { MailService }			from './mail/mail.service';
import { TopkService }			from './topk/topk.service';

// filters
import {KeysPipe} 					from './filters/keys.pipe';

// components
import { AppComponent }			from './app.component';
import { AlertComponent }		from './header.alert/alert.component';
import { MainComponent }		from './main/main.component';
import { HeaderComponent }	from './header/header.component';
import { LoginComponent }		from './login/login.component';
import { LogoutComponent }	from './header.logout/logout.component';
import { MailComponent }		from './mail/mail.component';
import { TopkComponent }		from './topk/topk.component';


@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AppRouting
	],
	providers: [
		AlertService,
		UserService,
		MailService,
		TopkService,
	],
	declarations: [
		AppComponent,

		HeaderComponent,
			AlertComponent,
			LogoutComponent,

		MainComponent,
		LoginComponent,
		MailComponent,
		TopkComponent,

		KeysPipe,
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule { }

