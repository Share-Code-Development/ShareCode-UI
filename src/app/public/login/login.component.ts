import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { FormControl, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public showForgotModel = false;

  public forgotEmailControl = new FormControl('', [Validators.required, Validators.pattern(this.config.emailRegex)]);
  private subs: Subscription = new Subscription();

  constructor(
    private router: Router,
    private authService: SocialAuthService,
    private userService: UserService,
    private config: ConfigService
  ) { }

  ngOnInit(): void {
    this.subs.add(this.authService.authState.subscribe((user) => {
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
          this.userService.setupAuthState(res.user, res.token);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }));
  }

  public onLogin() {
    this.router.navigate(['/dashboard']);
  }

  public onSend() {
    console.log(this.forgotEmailControl.valid);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
