import { Component } from '@angular/core';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrl: './code.component.scss'
})
export class CodeComponent {

  public navBarHeight = 0;

  public onChangeNavBarHeight(height: number) {
    this.navBarHeight = height;
  }

}
