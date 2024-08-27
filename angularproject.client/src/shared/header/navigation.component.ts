import { Component, AfterViewInit, EventEmitter, Output, OnInit, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RouteInfo } from '../sidebar/sidebar.metadata';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '../../directives/directives.module';
import { MSAL_GUARD_CONFIG, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { RedirectRequest } from '@azure/msal-browser';
import { NavService } from '../../services/nav.service';
import { environment } from '../../environment';
import { AzureAdService } from '../../services/azure-ad.service';
import { BehaviorSubject } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NgbDropdownModule, RouterModule, CommonModule, DirectivesModule],
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  public isLoggedIn = false
  public showSearch = false;

  constructor(
    private modalService: NgbModal,
    private msalService: MsalService,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private azureAdService: AzureAdService
  )
  { }


  login() {
    if (this.msalGuardConfig.authRequest) {
      this.msalService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest).subscribe()
    }
    else {
      this.msalService.loginRedirect()
    }
  }


  logout() {
    this.msalService.logoutRedirect({
      postLogoutRedirectUri: environment.postLogoutUrl
    })
  }


  ngOnInit(): void {
    this.azureAdService.isUserLoggedIn.subscribe(x => {
      this.isLoggedIn=x
    })
  }
}
