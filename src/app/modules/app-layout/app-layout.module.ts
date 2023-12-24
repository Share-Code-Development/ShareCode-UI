import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { SharedModule } from '@app/shared/shared.module';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DynamicDialogModule,
    RouterModule
  ],
  declarations: [
    NavbarComponent,
    SidemenuComponent
  ],
  exports: [
    NavbarComponent,
    SidemenuComponent
  ]
})
export class AppLayoutModule { }
