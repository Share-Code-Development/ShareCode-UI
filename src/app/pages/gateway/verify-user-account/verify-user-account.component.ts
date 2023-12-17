import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fadeIn, scaleUp } from '@app/animations/animations';
import { EGatewayType } from '@app/models/auth.model';
import { GatewayService } from '@app/services/gateway.service';

@Component({
  selector: 'app-verify-user-account',
  templateUrl: './verify-user-account.component.html',
  styleUrls: ['./verify-user-account.component.scss'],
  animations: [
    fadeIn,
    scaleUp
  ]
})
export class VerifyUserAccountComponent implements OnInit {

  public loading = false;
  public result: boolean | null = null;
  public message = 'Please Wait...';

  constructor(
    private route: ActivatedRoute,
    private gatewayService: GatewayService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.loading = true;
      this.gatewayService.verifyUserAccountAsync(EGatewayType.verifyUserAccount, id).subscribe({
        next: () => {
          this.loading = false;
          this.result = true;
          this.message = 'Account verified successfully';
        },
        error: (err) => {
          console.log(err);
          this.loading = false;
          this.result = false;
          this.message = 'Account verification failed';
        }
      })
    } else {
      this.result = false;
      this.message = 'verification token not found';
    }
  }

}
