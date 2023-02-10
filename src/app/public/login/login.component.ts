import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { takeWhile } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public showForgotModel = false;

  constructor(
    private router: Router,
    private authService: SocialAuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.authService.authState.pipe(takeWhile(() => true /* check if logged in to unsubscribe */)).subscribe((user) => {
      console.log(user)
      const body = {
        fullName: user.name,
        email: user.email,
        image: user.photoUrl,
        idToken: user.idToken
      }
      this.userService.googleLoginAsync(body).subscribe({
        next: (res) => {
          console.log(res);
          // this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.log(err);
        }
      });
    });
  }

  public onLogin() {
    this.router.navigate(['/dashboard']);
  }

}
