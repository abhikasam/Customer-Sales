import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { InteractionRequiredAuthError } from '@azure/msal-browser';
import { BehaviorSubject, Observable, Subject, catchError, from, map, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AzureAdService{
  isUserLoggedIn: Subject<boolean> = new BehaviorSubject<boolean>(false)
  roles = new BehaviorSubject<string[]>([])
  constructor(
    public msalService: MsalService,
    public http: HttpClient
  ) { }

  getRoles(): string[] {
    return this.roles.value
  }

  setUserRoles(username: string) {
    this.http.get<string[]>('/api/user/' + username).subscribe(res => {
      console.log(res)
      this.roles.next(res)
    })
  }

  getToken(): Observable<string> {
    return from(this.msalService.instance.acquireTokenSilent({
      scopes: ['user.read']
    })).pipe(
      map(token => {
        console.log(token)
        return token.idToken
      }),
      catchError(error => {
        if (error instanceof InteractionRequiredAuthError
          || (error instanceof HttpErrorResponse && error.status === 401)) {
            this.login()
        }
        return throwError(() => error);
      })
    );
  }

  login() {
    this.msalService.loginPopup({ scopes: ['user.read'] }).subscribe({
      next: (result) => {
        let token = result.idToken
        let headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        })
        this.setUserRoles(result.account.username)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

}
