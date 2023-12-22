import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '@shared/shared.module';
import { OverviewComponent } from './overview/overview.component';
import { CarouselModule } from 'primeng/carousel';
import { AppLayoutModule } from '@app/modules/app-layout/app-layout.module';
import { SnippetModule } from '@app/modules/snippet/snippet.module';

@NgModule({
  declarations: [
    DashboardComponent,
    OverviewComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    CarouselModule,
    AppLayoutModule,
    SnippetModule
  ],
})
export class DashboardModule { }
