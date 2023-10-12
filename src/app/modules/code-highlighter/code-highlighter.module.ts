import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeHighlighterComponent } from './code-highlighter.component';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CodeHighlighterComponent],
  imports: [
    CommonModule,
    MonacoEditorModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [CodeHighlighterComponent]
})
export class CodeHighlighterModule { }
