import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizedRolesDirective } from './authorized-roles.directive';



@NgModule({
  declarations: [
     AuthorizedRolesDirective
  ],
  exports: [
     AuthorizedRolesDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
