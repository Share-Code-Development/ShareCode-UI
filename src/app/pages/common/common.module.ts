
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullscreenStatusComponent } from './fullscreen-status/fullscreen-status.component';
import { CommonRoutingModule } from './common-routing.module';

@NgModule({
    declarations: [
        FullscreenStatusComponent
    ],
    imports: [
        CommonModule,
        CommonRoutingModule
    ],
    exports: []
})
export class CommonPagesModule { }
