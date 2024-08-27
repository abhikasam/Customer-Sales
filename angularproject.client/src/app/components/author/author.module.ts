import { NgModule } from "@angular/core";
import { AuthorComponent } from "./author.component";
import { CommonModule } from "@angular/common";
import { AuthorBooksComponent } from './author-books/author-books.component';
import { BookModule } from "../book/book.module";


@NgModule({
  declarations: [AuthorComponent, AuthorBooksComponent],
  imports: [CommonModule, BookModule],
  exports:[AuthorComponent]
})
export class AuthorModule { }
