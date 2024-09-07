import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { CustomerRoutingModule } from './customer-routing.module';



@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule, CustomerRoutingModule
  ]
})
export class CustomerModule { }
