import { Directive, Injectable, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AzureAdService } from '../services/azure-ad.service';

@Directive({
  selector: '[authroles]'
})
@Injectable({
    providedIn:'root'
})
export class AuthorizedRolesDirective implements OnInit {
  private roles: string[] = []
  
  @Input() set authroles(allowedRoles: string) {
    this.roles = allowedRoles.split(",")
  }

  constructor(
    private azureADService: AzureAdService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  )
  {
  }


  ngOnInit(): void {
    this.azureADService.roles.subscribe((roles: string[]) => {
      this.updateView(roles)
    })
  }


  updateView(userroles:string[]) {
    this.viewContainer.clear()
    console.log(this.roles, userroles)
    if (!this.roles.length || this.roles.some(r => userroles.includes(r))) {
      this.viewContainer.createEmbeddedView(this.templateRef)
    }
  }
}
