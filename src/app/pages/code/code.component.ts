import { Component } from '@angular/core';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrl: './code.component.scss'
})
export class CodeComponent {

  constructor(
    protected userService: UserService
  ) { }

}
