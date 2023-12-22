import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/services/config.service';
import { CommonService } from 'src/app/services/common.service';
import { EAuthType } from '@app/models/auth.model';
import { fadeIn, scaleUp } from '@app/animations/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    fadeIn,
    scaleUp
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  public showForgotModel = false;
  private errorContext = {
    ENTITY_TYPE: "User",
    ENTITY_VALUE: ""
  }

  public forgotEmailControl = new FormControl('', [Validators.required, Validators.pattern(this.config.emailRegex)]);
  private subs: Subscription = new Subscription();
  public sendingEmail = false;
  public loginForm = new FormGroup({
    emailAddress: new FormControl('', [Validators.required, Validators.pattern(this.config.emailRegex)]),
    password: new FormControl('', [Validators.required]),
    type: new FormControl(EAuthType.general)
  });
  public submitted = false;
  public errorMessage = '';
  public loading = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private config: ConfigService,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.userService.logout();
    this.subs.add(
      this.loginForm.get('emailAddress')?.valueChanges.subscribe((res: any) => {
        this.errorContext.ENTITY_VALUE = res;
      })
    );
  }

  public onLogin() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.errorMessage = '';
      this.loading = true;
      this.userService.loginAsync(this.loginForm.value).subscribe({
        next: res => {
          this.userService.setupAuthState(res, res.accessToken, res.refreshToken);
          this.loading = false;
          this.router.navigate(['/dashboard'], { replaceUrl: true })
        },
        error: err => {
          this.loading = false;
          this.errorMessage = this.commonService.getErrorMessages(err, this.errorContext).join(', ')
        }
      })
    }
  }

  public onSend() {
    if (this.forgotEmailControl.valid) {
      this.sendingEmail = true;
      this.userService.forgotPasswordAsync({ emailAddress: this.forgotEmailControl.value }).subscribe({
        next: () => {
          this.showForgotModel = false;
          this.sendingEmail = false;
          this.commonService.showSuccess('Email sent successfully, Check your inbox');
        },
        error: (err) => {
          this.sendingEmail = false;
          this.commonService.showError(err, this.errorContext);
        }
      });
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
