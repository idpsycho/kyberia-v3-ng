import { BrowserModule }		from '@angular/platform-browser';
import { NgModule }				from '@angular/core';
import { FormsModule }			from '@angular/forms';
import { HttpModule }			from '@angular/http';

import { AppRouting }			from './app.routing';

// services
import { Httpv3 }				from './_shared/_services/httpv3.service';
import { UserService }			from './_shared/user.service';
import { AlertService }			from './header.alert/alert.service';
import { MailService }			from './mail/mail.service';
import { TopkService }			from './topk/topk.service';

// filters
import {KeysPipe}				from './_shared/_pipes/keys.pipe';
import {UserIdToAvatarSrcPipe} 	from './_shared/_pipes/userIdToAvatarSrc.pipe';

// components
import { AppComponent }			from './app.component';
import { AlertComponent }		from './header.alert/alert.component';
import { MainComponent }		from './main/main.component';
import { HeaderComponent }		from './header/header.component';
import { LoginComponent }		from './login/login.component';
import { LogoutComponent }		from './header.logout/logout.component';
import { MailComponent }		from './mail/mail.component';
import { MailUsersComponent }	from './mail.users/mail-users.component';
import { MailThreadComponent }	from './mail.thread/mail-thread.component';
import { TopkComponent }		from './topk/topk.component';


@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AppRouting
	],
	providers: [
		Httpv3,
		UserService,
		AlertService,
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
			MailThreadComponent,
			MailUsersComponent,
		TopkComponent,

		// pipes
		KeysPipe,
		UserIdToAvatarSrcPipe,
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule { }

