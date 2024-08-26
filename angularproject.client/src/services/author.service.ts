import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { InteractionRequiredAuthError } from '@azure/msal-browser';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorService{
  constructor(public http: HttpClient) { }

  getAuthors() {
    return this.http.get<string[]>('/api/author')
  }
  
}
