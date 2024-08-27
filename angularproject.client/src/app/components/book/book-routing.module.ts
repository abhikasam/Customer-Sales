import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: 'detail',
    component: DetailComponent,
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule
  ]
})
export class BookRoutingModule { }
