import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType } from '@azure/msal-browser';
import { HomeComponent } from './layout/home/home.component';
import { ProfileComponent } from './layout/profile/profile.component';
import { AppRoutingModule } from './app-routing.module';
import { msalConfiguration } from './auth-config';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, AppRoutingModule,
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
  }, MsalGuard],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
