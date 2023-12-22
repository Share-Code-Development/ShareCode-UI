import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ConfigService } from 'src/app/services/config.service';
import { UserService } from 'src/app/services/user.service';
import { mismatchValidator } from 'src/app/utils/custom-validators';
import { fadeIn, scaleUp } from '@app/animations/animations';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [
    fadeIn,
    scaleUp
  ]
})
export class SignupComponent implements OnInit {

  public loading = false;
  public submitted = false;
  public errorMsg = ''
  public signupForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(this.config.nameMinLength)]),
    middleName: new FormControl(''),
    lastName: new FormControl('', [Validators.required, Validators.minLength(this.config.nameMinLength)]),
    emailAddress: new FormControl('', [Validators.required, Validators.pattern(this.config.emailRegex)]),
    password: new FormControl('', [Validators.required, Validators.minLength(this.config.passwordMinLength)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(this.config.passwordMinLength)])
  }, { validators: mismatchValidator('password', 'confirmPassword') });

  constructor(
    private config: ConfigService,
    private userService: UserService,
    private commonService: CommonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.logout();
  }

  public onSignup() {
    this.submitted = true;
    if (this.signupForm.valid) {
      this.errorMsg = '';
      const body: any = {
        ...this.signupForm.value,
        confirmPassword: undefined
      }
      this.loading = true;
      this.userService.signupAsync(body).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/common/success'], { queryParams: { message: 'Signup successful', description: 'Please check your email for verification link' } })
        },
        error: err => {
          this.loading = false;
          this.errorMsg = this.commonService.getErrorMessages(err).join(', ')
        }
      });
    } else if (!this.signupForm.hasError('required', ['confirmPassword']) && this.signupForm.hasError('mismatch')) {
      this.errorMsg = 'Oops! Passwords does not match';
    } else {
      this.errorMsg = '';
    }

  }

}
