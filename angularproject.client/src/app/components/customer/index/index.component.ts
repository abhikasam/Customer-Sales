import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../../services/customer.service';
import { Customer } from '../../../../models/customer.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  customers: Customer[]=[]
  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.customerService.get().subscribe(res => {
      this.customers = res
    })
  }
}
