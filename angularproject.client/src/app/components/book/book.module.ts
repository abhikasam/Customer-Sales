import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view/view.component';
import { DetailComponent } from './detail/detail.component';
import { BookRoutingModule } from './book-routing.module';
import { IndexComponent } from './index/index.component';
import { DirectivesModule } from '../../../directives/directives.module';



@NgModule({
  declarations: [
    ViewComponent,
    DetailComponent,
    IndexComponent
  ],
  imports: [
    CommonModule, BookRoutingModule, DirectivesModule
  ],
  exports: [ViewComponent]
})
export class BookModule { }
