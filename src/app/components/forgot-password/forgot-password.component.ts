import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/services/config.service';
import { mismatchValidator } from 'src/app/utils/custom-validators';
import { UserService } from 'src/app/services/user.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  private userId: string = '';
  private token: string = '';
  public resetForm = new FormGroup({
    password: new FormControl<string>('', [Validators.required, Validators.minLength(this.config.passwordMinLength)]),
    confirmPassword: new FormControl<string>('', [Validators.required, Validators.minLength(this.config.passwordMinLength)])
  }, { validators: mismatchValidator('password', 'confirmPassword') });
  public errorMessage = '';
  public submitted = false;
  public loading = false;

  constructor(
    private route: ActivatedRoute,
    private config: ConfigService,
    private userService: UserService,
    private commonService: CommonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const { userId, token } = this.route.snapshot.params;
    this.userId = userId;
    this.token = token;
  }

  public onReset() {
    this.submitted = true;
    if (this.resetForm.valid && !this.loading) {
      this.errorMessage = '';
      this.loading = true;
      this.userService.resetPasswordAsync({
        userId: this.userId,
        token: this.token,
        password: this.resetForm.value.password
      }).subscribe({
        next: (res) => {
          this.loading = false;
          this.commonService.showSuccess('Password reset successfully');
          this.router.navigate(['/login'], { replaceUrl: true });
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.error.message;
        },
      });
    } else {
      if (this.resetForm.hasError('mismatch')) {
        this.errorMessage = 'Oops! Passwords do not match';
      }
    }
  }

}
