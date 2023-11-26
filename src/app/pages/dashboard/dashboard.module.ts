import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '@shared/shared.module';
import { OverviewComponent } from './overview/overview.component';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
  declarations: [
    DashboardComponent,
    OverviewComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    CarouselModule
  ],
})
export class DashboardModule { }
