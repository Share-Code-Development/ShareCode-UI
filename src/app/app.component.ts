import { Component, OnInit } from '@angular/core';
import { fadeOut, scaleDown } from './animations/animations';
import { CommonService } from './services/common.service';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from './services/user.service';

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
  public showWaveAnimation = true;

  constructor(
    public commonService: CommonService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.showWaveAnimation = !this.router.url.startsWith('/dashboard');
    this.router.events.subscribe({
      next: event => {
        if (event instanceof NavigationEnd) {
          if (['/', '/login', '/signup'].includes(event.urlAfterRedirects)) {
            document.body.style.setProperty(`--google-onetap-visibility`, 'block');
          } else {
            document.body.style.setProperty(`--google-onetap-visibility`, 'none');
          }
        }
      }
    })
  }
}
