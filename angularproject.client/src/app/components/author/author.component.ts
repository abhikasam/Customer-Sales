import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthorService } from '../../../services/author.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  authors = new BehaviorSubject<string[]>([])
  constructor(
    public authorService: AuthorService,
    public router: Router) { }

  ngOnInit(): void {
    this.authorService.getAuthors().subscribe(x => {
      this.authors.next(x)
    })
  }

  openAuthorBooks(author:string) {
    this.router.navigate(['authors/books'],
      {
        state: {
          name: author
        }
      }
    )
  }

}
