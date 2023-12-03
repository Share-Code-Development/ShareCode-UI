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
    path: 'reset-password/:userId/:token',
    loadComponent: () => import('./components/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
