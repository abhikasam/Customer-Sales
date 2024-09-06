import { Directive, Injectable, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AzureAdService } from '../services/azure-ad.service';

@Directive({
  selector: '[authroles]'
})
@Injectable({
    providedIn:'root'
})
export class AuthorizedRolesDirective {
  private roles: string[]=[]
  
  @Input() set authroles(allowedRoles: string) {
    this.roles = allowedRoles.split(",")
    this.updateView()
  }

  constructor(
    private azureADService: AzureAdService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  )
  {
    this.updateView()
  }


  updateView() {
    this.viewContainer.clear()
    let userroles: string[] = []
    this.azureADService.roles.subscribe((roles: string[]) => {
      userroles = roles
    })
    console.log(this.roles, userroles)
    if (!this.roles.length || this.roles.some(r => userroles.includes(r))) {
      this.viewContainer.createEmbeddedView(this.templateRef)
    }
  }
}
