import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from '@shared/shared.module';
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { FormsModule } from '@angular/forms';
import { ValidityColorsModule } from '@app/modules/validity-colors.module';
import { PublicNavbarComponent } from '@app/components/public-navbar/public-navbar.component';
import { AppLayoutModule } from '@app/modules/app-layout/app-layout.module';


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
    SocialLoginModule,
    FormsModule,
    ValidityColorsModule,
    PublicNavbarComponent,
    AppLayoutModule
  ],
  bootstrap: [HomeComponent]
})
export class PublicModule { }
