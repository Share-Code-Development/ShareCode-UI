import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    public userService: UserService
  ) { }

  public profileImage$ = this.userService.authUser$.pipe(map(el => el?.image))

  ngOnInit(): void {
  }

  public async logout() {
    this.userService.logout();
    this.router.navigate(['/'])
  }

}
