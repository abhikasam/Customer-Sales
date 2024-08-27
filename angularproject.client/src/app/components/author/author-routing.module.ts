import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthorComponent } from "./author.component";
import { AuthorBooksComponent } from "./author-books/author-books.component";

var routes: Routes = [
  {
    path: '',
    component: AuthorComponent,
    pathMatch: "full"
  },
  {
    path: 'books',
    component: AuthorBooksComponent,
    pathMatch: 'full'
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorRoutingModule { }
