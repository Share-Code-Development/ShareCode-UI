import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HighlightOptions, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { DialogService } from 'primeng/dynamicdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider
} from '@abacritt/angularx-social-login';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: <HighlightOptions>{
        lineNumbers: true,
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        // @ts-ignore
        lineNumbersLoader: () => import('highlightjs-line-numbers.js/dist/highlightjs-line-numbers.min.js'),
        themePath: 'node_modules/highlight.js/styles/androidstudio.css',
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          css: () => import('highlight.js/lib/languages/css'),
          xml: () => import('highlight.js/lib/languages/xml'),

        },
      },
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {        
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '939503022711-9m2d1ejrp8ufj52m52iab1klqeqdk37k.apps.googleusercontent.com',
            ),            
          }
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
    DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }