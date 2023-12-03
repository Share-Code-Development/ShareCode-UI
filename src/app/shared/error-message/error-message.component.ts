import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
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
