import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../../../models/book.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  @Input() book: Book = Book.empty()

  constructor(public router: Router)
  { }

  ngOnInit(): void {
    let navigation = this.router.getCurrentNavigation()
    if (navigation?.extras.state) {
      this.book = (navigation.extras.state as any).book
    }
    else {
      this.book = (window.history.state as any).book
    }
  }

}
