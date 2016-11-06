import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRouting } from './app.routing'; 

import { AppComponent } from './app.component';

import { MainComponent } from './main/main.component';
import { LoginComponent } from './header.login/login.component';
import { LogoutComponent } from './header.logout/logout.component';
import { HeaderComponent } from './header/header.component';
import { MailComponent } from './mail/mail.component';


@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AppRouting
	],
	declarations: [
		AppComponent,

		HeaderComponent,
			LoginComponent,
			LogoutComponent,

		MainComponent,
		MailComponent,
	],
	providers: [],
	bootstrap: [
		AppComponent
	]
})
export class AppModule { }

