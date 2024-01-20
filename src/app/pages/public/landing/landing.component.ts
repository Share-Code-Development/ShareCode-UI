import { Component } from '@angular/core';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

  constructor(
    public userService: UserService
  ) { }

}
