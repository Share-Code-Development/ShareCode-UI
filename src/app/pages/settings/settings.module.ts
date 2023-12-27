import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { AccountComponent } from './account/account.component';
import { SharedModule } from '@shared/shared.module';
import { AppLayoutModule } from '@app/modules/app-layout/app-layout.module';


@NgModule({
  declarations: [
    SettingsComponent,
    AccountComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    AppLayoutModule
  ]
})
export class SettingsModule { }
