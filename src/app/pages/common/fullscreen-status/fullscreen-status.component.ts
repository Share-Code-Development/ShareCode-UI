import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeIn, scaleUp } from '@app/animations/animations';

@Component({
  selector: 'app-fullscreen-status',
  templateUrl: './fullscreen-status.component.html',
  styleUrls: ['./fullscreen-status.component.scss'],
  animations: [
    fadeIn,
    scaleUp
  ]
})
export class FullscreenStatusComponent implements OnInit {

  public message = 'Successful';
  public description = 'Operation completed successfully';
  public type: 'success' | 'failed' = 'success';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.type = this.router.url.startsWith('/common/success') ? 'success' : 'failed';
    if (this.type === 'failed') {
      this.message = 'Failed';
      this.description = 'Operation failed';
    }
    const successMessage = this.route.snapshot.queryParams['message'];
    const description = this.route.snapshot.queryParams['description'];
    if (successMessage) {
      this.message = successMessage;
    }
    if (description) {
      this.description = description;
    }
  }

}
