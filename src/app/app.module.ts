import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DialogService } from 'primeng/dynamicdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SocialAuthServiceConfig, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './services/resolvers/http.interceptor';
import { environment } from 'src/environments/environment';
import { AppInitService } from './services/resolvers/initializer.service';
import { UserService } from './services/user.service';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { RefreshTokenInterceptor } from './services/resolvers/refresh-token.interceptor';

export function initializeApp1(appInitService: AppInitService) {
  return () => appInitService.init()
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MonacoEditorModule.forRoot()
  ],
  providers: [
    UserService,
    DialogService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.googleClientId,
              {
                oneTapEnabled: false //disabling  because lack of control over the UI
              }
            ),
          }
        ],
        onError: (err) => {
          console.error(err);
        },        
      } as SocialAuthServiceConfig,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp1,
      deps: [AppInitService],
      multi: true
    },
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: 'dd/MM/yyyy hh:mm a' }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }