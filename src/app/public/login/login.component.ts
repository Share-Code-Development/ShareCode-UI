import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(this.config.emailRegex)]),
    password: new FormControl('', [Validators.required, Validators.minLength(this.config.passwordMinLength)])
  });
  public submitted = false;
  public errorMessage = '';
  public loading = false;

  constructor(
    private router: Router,
    private authService: SocialAuthService,
    private userService: UserService,
    private config: ConfigService,
    private commonService: CommonService
  ) { }

  ngOnInit() {
  }

  public onLogin() {
    // this.router.navigate(['/dashboard']);
    this.submitted = true;
    console.log(this.loginForm.value)
    if (this.loginForm.valid) {
      this.errorMessage = '';
      this.loading = true;
      this.userService.loginAsync(this.loginForm.value).subscribe({
        next: res => {
          this.userService.setupAuthState(res.user, res.token);
          this.loading = false;
          this.router.navigate(['/dashboard'], { replaceUrl: true })
        },
        error: err => {
          this.loading = false;
          this.errorMessage = this.commonService.getErrorMessages(err).join(', ')
        }
      })
    }
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
          this.commonService.showError(err);
        }
      });
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
