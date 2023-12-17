import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GatewayRoutingModule } from './gateway-routing.module';
import { VerifyUserAccountComponent } from './verify-user-account/verify-user-account.component';
import { SharedModule } from '@app/shared/shared.module';
import { ValidityColorsModule } from '@app/modules/validity-colors.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    VerifyUserAccountComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    GatewayRoutingModule,
    SharedModule,    
    ValidityColorsModule
  ]
})
export class GatewayModule { }
