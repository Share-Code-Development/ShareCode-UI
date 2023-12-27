import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit {

  @ViewChild('navContainer') private navContainer!: ElementRef<HTMLDivElement>;

  constructor(
    private router: Router,
    public userService: UserService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngAfterViewInit(): void {
    const height = `${this.navContainer.nativeElement.clientHeight}px` ;
    this.document.documentElement.style.setProperty(`--navbar-height`, height);
  }

  public async logout() {
    this.userService.logout();
    this.router.navigate(['/'])
  }

}
