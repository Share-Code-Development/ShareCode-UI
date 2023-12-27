import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/public/public.module').then(m => m.PublicModule)
  },
  {
    path: 'common',
    loadChildren: () => import('./pages/common/common.module').then(m => m.CommonPagesModule)
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'code',
    loadChildren: () => import('./pages/code/code.module').then(m => m.CodeModule)
  },
  {
    path: 'gateway',
    loadChildren: () => import('./pages/gateway/gateway.module').then(m => m.GatewayModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
