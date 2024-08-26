import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';
import { environment } from '../environment';
import { AzureAdService } from '../services/azure-ad.service';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly _destroy = new Subject<void>()
  public isUserLoggedIn: boolean = false
  constructor(private http: HttpClient,
    private msalBroardCastService: MsalBroadcastService,
    private authService: MsalService, private azureAdService: AzureAdService) {

  }
    ngOnDestroy(): void {
      this._destroy.next(undefined)
      this._destroy.complete()
    }

  ngOnInit() {
    this.msalBroardCastService.inProgress$.pipe
      (filter((interactionStatus: InteractionStatus)=>
        interactionStatus == InteractionStatus.None),
        takeUntil(this._destroy)
      )
      .subscribe(x => {
        this.isUserLoggedIn = !!this.authService.instance.getAllAccounts().length
        this.azureAdService.isUserLoggedIn.next(!!this.authService.instance.getAllAccounts().length)
      })
  }

  title = 'angularproject.client';
}
