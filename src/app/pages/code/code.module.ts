import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeRoutingModule } from './code-routing.module';
import { SnippetModule } from '@app/modules/snippet/snippet.module';
import { CodeComponent } from './code.component';
import { SharedModule } from '@app/shared/shared.module';
import { AppLayoutModule } from '@app/modules/app-layout/app-layout.module';
import { ViewSnippetComponent } from './view-snippet/view-snippet.component';
import { CodeHighlighterModule } from '@app/modules/code-highlighter/code-highlighter.module';
import { PublicNavbarComponent } from '@app/components/public-navbar/public-navbar.component';


@NgModule({
  declarations: [
    CodeComponent,
    ViewSnippetComponent
  ],
  imports: [
    CommonModule,
    CodeRoutingModule,
    SnippetModule,
    SharedModule,
    AppLayoutModule,
    CodeHighlighterModule,
    PublicNavbarComponent
  ]
})
export class CodeModule { }
