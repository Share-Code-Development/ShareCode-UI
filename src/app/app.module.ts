import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HighlightOptions, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
