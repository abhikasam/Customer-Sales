import { NgModule } from "@angular/core";
import { AuthorComponent } from "./author.component";
import { CommonModule } from "@angular/common";
import { AuthorBooksComponent } from './author-books/author-books.component';


@NgModule({
  declarations: [AuthorComponent, AuthorBooksComponent],
  imports: [CommonModule],
  exports:[AuthorComponent]
})
export class AuthorModule { }
