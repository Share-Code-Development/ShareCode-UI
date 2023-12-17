import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifyUserAccountComponent } from './verify-user-account/verify-user-account.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: 'verify-user-account/:id',
    component: VerifyUserAccountComponent
  },
  {
    path: 'forgot-password/:id',
    component: ForgotPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GatewayRoutingModule { }
