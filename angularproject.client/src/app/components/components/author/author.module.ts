import { NgModule } from "@angular/core";
import { AuthorComponent } from "./author.component";
import { CommonModule } from "@angular/common";


@NgModule({
  declarations: [AuthorComponent],
  imports: [CommonModule],
  exports:[AuthorComponent]
})
export class AuthorModule { }
