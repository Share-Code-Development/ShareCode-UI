import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { fadeIn, fadeOut, scaleDown, scaleUp } from '@app/animations/animations';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
  animations: [
    fadeIn,
    scaleUp,
    fadeOut,
    scaleDown
  ]
})
export class ErrorMessageComponent implements OnInit {

  @Input() errorMessage = '';
  @Input() isFloating = false;
  @Input() show = true;
  @Input() control!: AbstractControl | FormControl | null;
  @Input() controlName = '';


  constructor() { }

  ngOnInit() {
  }

}
