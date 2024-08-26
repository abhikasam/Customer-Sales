import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { ProfileComponent } from './layout/profile/profile.component';
import { MsalGuard } from '@azure/msal-angular';
import { DashboardComponent } from '../shared/dashboard/dashboard.component';
import { AccessDeniedComponent } from '../shared/access-denied/access-denied.component';
import { ExceptionComponent } from '../shared/exception/exception.component';
import { FullComponent } from '../shared/full/full.component';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: "full",
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        pathMatch: 'full'
      },
      {
        path: 'access-denied',
        component: AccessDeniedComponent,
        pathMatch: "full"
      },
      {
        path: 'error',
        component: ExceptionComponent,
        pathMatch: "full"
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
