import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ElementRef, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-public-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './public-navbar.component.html',
  styleUrl: './public-navbar.component.scss'
})
export class PublicNavbarComponent implements AfterViewInit {

  @ViewChild('navContainer') private navContainer!: ElementRef<HTMLDivElement>;
  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngAfterViewInit(): void {
    const height = `${this.navContainer.nativeElement.clientHeight}px`;
    this.document.documentElement.style.setProperty(`--navbar-height`, height);
  }

}
