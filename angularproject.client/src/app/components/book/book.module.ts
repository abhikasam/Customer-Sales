import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view/view.component';
import { DetailComponent } from './detail/detail.component';
import { BookRoutingModule } from './book-routing.module';



@NgModule({
  declarations: [
    ViewComponent,
    DetailComponent
  ],
  imports: [
    CommonModule, BookRoutingModule
  ],
  exports: [ViewComponent]
})
export class BookModule { }
