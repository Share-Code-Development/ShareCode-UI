import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputValidityDirective } from '../directives/input-validity-colors.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    InputValidityDirective
  ],
  exports: [
    InputValidityDirective
  ],
})
export class ValidityColorsModule { }
