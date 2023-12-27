import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeRoutingModule } from './code-routing.module';
import { SnippetModule } from '@app/modules/snippet/snippet.module';
import { CodeComponent } from './code.component';
import { SharedModule } from '@app/shared/shared.module';
import { AppLayoutModule } from '@app/modules/app-layout/app-layout.module';


@NgModule({
  declarations: [
    CodeComponent
  ],
  imports: [
    CommonModule,
    CodeRoutingModule,
    SnippetModule,
    SharedModule,
    AppLayoutModule
  ]
})
export class CodeModule { }
