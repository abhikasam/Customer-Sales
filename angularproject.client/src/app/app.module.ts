import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType } from '@azure/msal-browser';
import { AppRoutingModule } from './app-routing.module';
import { msalConfiguration } from './auth-config';
import { DirectivesModule } from '../directives/directives.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AuthInterceptor } from '../services/auth-interceptor';
import { AuthorModule } from './components/author/author.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, AppRoutingModule, SharedModule, DirectivesModule,
    CommonModule, AuthorModule,
    MsalModule.forRoot(
      msalConfiguration,
      {
        interactionType: InteractionType.Redirect,
        authRequest: {
          //        extraScopesToConsent:['user.read']
          scopes: ['user.read']
        }
      },
      {
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map([
          ['https://graph.microsoft.com/v1.0/me', ['user.read']]
        ])
      }
    )
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi: true
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi:true
    }, MsalGuard],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
