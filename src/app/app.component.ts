import { Component, OnInit } from '@angular/core';
import { fadeOut, scaleDown } from './animations/animations';
import { CommonService } from './services/common.service';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from '@environment';
import { ConfigService } from './services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fadeOut,
    scaleDown
  ]
})
export class AppComponent implements OnInit {
  public showWaveAnimation = false;

  constructor(
    public commonService: CommonService,
    private router: Router,
    private config: ConfigService
  ) {
  }

  ngOnInit(): void {
    this.router.events.subscribe({
      next: event => {
        if (event instanceof NavigationEnd) {
          this.showWaveAnimation = this.config.isPublicRoute(this.router.url) && (true || environment.production);
          if (['/', '/login', '/signup'].includes(event.urlAfterRedirects)) {
            document.documentElement.style.setProperty(`--google-onetap-visibility`, 'block');
          } else {
            document.documentElement.style.setProperty(`--google-onetap-visibility`, 'none');
          }
        }
      }
    })
  }
}
