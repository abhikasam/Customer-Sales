import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../services/book.service';
import { Book } from '../../../../models/book.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  books: Book[]=[]
  constructor(public bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getAll().subscribe(x => {
      this.books=x
    })

  }

}
