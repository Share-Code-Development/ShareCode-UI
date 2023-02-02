import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { takeWhile } from 'rxjs';
declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: SocialAuthService
  ) { }

  ngOnInit(): void {
    this.authService.authState.pipe(takeWhile(() => true /* check if logged in to unsubscribe */)).subscribe((user) => {
      console.log(user)
      this.router.navigate(['/dashboard']);
    });
  }


  public onLogin() {
    this.router.navigate(['/dashboard']);
  }

}
