import { Component, Input } from '@angular/core';
import { Book } from '../../../../models/book.model';
import { Router } from '@angular/router';

@Component({
  selector: 'book-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  @Input() book: Book = Book.empty()

  constructor(
    public router: Router
  )
  { }

  openBookDetail() {
    this.router.navigate(['/books/detail'],
      {
        state:
        {
          book: this.book
        }
      })
  }

}
