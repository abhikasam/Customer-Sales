import { Injectable, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { InteractionRequiredAuthError } from '@azure/msal-browser';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AzureAdService{
  isUserLoggedIn: Subject<boolean> = new Subject<boolean>()
  constructor(private authService: MsalService) { }
}
