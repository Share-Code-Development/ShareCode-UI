import { Component } from '@angular/core';
import { fadeOut, scaleDown } from './animations/animations';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fadeOut,
    scaleDown
  ]
})
export class AppComponent {
  title = 'shareCodeUI';
  constructor(
    public commonService: CommonService
  ) {
    // document.designMode = 'on';
  }
}
