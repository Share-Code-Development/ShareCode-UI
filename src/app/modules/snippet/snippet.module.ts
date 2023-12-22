import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { CodeHighlighterModule } from '@app/modules/code-highlighter/code-highlighter.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateSnippetComponent } from './create-snippet/create-snippet.component';
import { CodeItemComponent } from './code-item/code-item.component';
import { ChipModule } from 'primeng/chip';

@NgModule({
  imports: [
    CommonModule,
    CodeHighlighterModule,
    ReactiveFormsModule,
    SharedModule,
    ChipModule,
  ],
  declarations: [
    CreateSnippetComponent,
    CodeItemComponent
  ],
  exports: [
    CreateSnippetComponent,
    CodeItemComponent
  ]
})
export class SnippetModule { }
