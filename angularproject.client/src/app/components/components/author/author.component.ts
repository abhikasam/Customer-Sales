import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../../../../services/author.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  authors = new BehaviorSubject<string[]>([])
  constructor(public authorService: AuthorService) { }

  ngOnInit(): void {
    this.authorService.getAuthors().subscribe(x => {
      console.log(x)
    })
  }
}
