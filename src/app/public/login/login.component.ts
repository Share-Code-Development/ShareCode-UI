import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { FormControl, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/services/config.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public showForgotModel = false;

  public forgotEmailControl = new FormControl('', [Validators.required, Validators.pattern(this.config.emailRegex)]);
  private subs: Subscription = new Subscription();
  public sendingEmail = false;

  constructor(
    private router: Router,
    private authService: SocialAuthService,
    private userService: UserService,
    private config: ConfigService,
    private commonService: CommonService
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
    if (this.forgotEmailControl.valid) {
      this.sendingEmail = true;
      this.userService.forgotPasswordAsync({ email: this.forgotEmailControl.value }).subscribe({
        next: (res) => {
          if (res.success) {
            this.showForgotModel = false;
            this.sendingEmail = false;
            this.commonService.showSuccess('Email sent successfully, Check your inbox');
          }
        },
        error: (err) => {
          this.sendingEmail = false;
          this.commonService.showError(err.error.message);
        }
      });
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
