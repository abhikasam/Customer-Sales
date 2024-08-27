import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MsalService } from '@azure/msal-angular';
import { from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { InteractionRequiredAuthError } from '@azure/msal-browser';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: MsalService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.authService.instance.acquireTokenSilent({
      scopes: ['user.read']
    })).pipe(
      switchMap(tokenResponse => {
        const clonedRequest = req.clone({
          setHeaders: {
            Authorization: `Bearer ${tokenResponse.idToken}`
          }
        });
        console.log(tokenResponse)
        return next.handle(clonedRequest);
      }),
      catchError(error => {
        if (error instanceof InteractionRequiredAuthError
          || (error instanceof HttpErrorResponse && error.status===401)) {
          this.authService.instance.acquireTokenRedirect({
            scopes: ['user.read']
          });
        }
        return throwError(()=>error);
      })
    );
  }
}
