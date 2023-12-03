import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullscreenStatusComponent } from './fullscreen-status/fullscreen-status.component';


const routes: Routes = [
    {
        path: 'success',
        component: FullscreenStatusComponent,
    },
    {
        path: 'failed',
        component: FullscreenStatusComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonRoutingModule { }
