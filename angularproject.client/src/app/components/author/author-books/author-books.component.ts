import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorService } from '../../../../services/author.service';
import { Book } from '../../../../models/book.model';

@Component({
  selector: 'app-author-books',
  templateUrl: './author-books.component.html',
  styleUrls: ['./author-books.component.css']
})
export class AuthorBooksComponent implements OnInit {
  author: string = ''
  books:Book[]=[]
  constructor(
    public router: Router,
    public authorService: AuthorService
  ) { }

  ngOnInit(): void {
    let navigation = this.router.getCurrentNavigation()
    if (navigation?.extras.state) {
      this.author = (navigation.extras.state as any).name
    }
    else {
      this.author = (window.history.state as any).name
    }

    this.authorService.getAuthorBooks(this.author).subscribe(x => {
      this.books=x
    })

  }
}
