import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from '../shared/shared.module';
import { SocialLoginModule } from '@abacritt/angularx-social-login';


@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    LandingComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
    SocialLoginModule
  ],
  bootstrap: [HomeComponent]
})
export class PublicModule { }
