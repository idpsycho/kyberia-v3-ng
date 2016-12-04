import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';


@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['main.component.scss']
})
export class MainComponent {

  constructor(public userService: UserService) { }

}
