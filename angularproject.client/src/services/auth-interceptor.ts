import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MsalService } from '@azure/msal-angular';
import { from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { InteractionRequiredAuthError } from '@azure/msal-browser';
import { AzureAdService } from './azure-ad.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private msalService: MsalService, private azureAdService: AzureAdService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.azureAdService.getToken()).pipe(
      switchMap(tokenResponse => {
        const clonedRequest = req.clone({
          setHeaders: {
            Authorization: `Bearer ${tokenResponse}`
          }
        });
        return next.handle(clonedRequest);
      })
    );
  }
}
