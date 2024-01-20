import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/services/config.service';
import { mismatchValidator } from 'src/app/utils/custom-validators';
import { CommonService } from 'src/app/services/common.service';
import { GatewayService } from '@app/services/gateway.service';
import { EGatewayType } from '@app/models/auth.model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

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
    private commonService: CommonService,
    private router: Router,
    private gatewayService: GatewayService
  ) { }

  ngOnInit(): void {
    const { id: token } = this.route.snapshot.params;
    this.token = token;
  }

  public onReset() {
    this.submitted = true;
    if (this.resetForm.valid && !this.loading) {
      this.errorMessage = '';
      this.loading = true;
      this.gatewayService.forgotPasswordAsync(EGatewayType.forgotPassword, this.token, {
        newPassword: this.resetForm.value.password!
      }).subscribe({
        next: () => {
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
