import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { MainComponent }  from './main/main.component';
import { MailComponent }  from './mail/mail.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: MainComponent },
      { path: 'mail', component: MailComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouting {}