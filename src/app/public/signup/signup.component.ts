import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ConfigService } from 'src/app/services/config.service';
import { UserService } from 'src/app/services/user.service';
import { mismatchValidator } from 'src/app/utils/custom-validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public loading = false;
  public submitted = false;
  public errorMsg = ''
  public signupForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(this.config.nameMinLength)]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.config.emailRegex)]),
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
    console.log(this.signupForm.value);
    if (this.signupForm.valid) {
      this.errorMsg = '';
      const body: any = {
        ...this.signupForm.value,
        confirmPassword: undefined
      }
      this.loading = true;
      this.userService.signupAsync(body).subscribe({
        next: res => {
          if(!res?.success) {
            this.errorMsg = res?.message || 'Signup failed, please try again later';
            return;
          }
          this.commonService.showSuccess('Signup successful, Please login to continue');
          this.loading = false;
          this.router.navigate(['/login'])
        },
        error: err => {
          this.loading = false;
          this.errorMsg = this.commonService.getErrorMessages(err).join(', ')
        }
      });
    } else if (!this.signupForm.hasError('required', ['confirmPassword']) && this.signupForm.hasError('mismatch')) {
      this.errorMsg = 'Oops! Passwords do not match';
    } else {
      this.errorMsg = '';
    }

  }

}
