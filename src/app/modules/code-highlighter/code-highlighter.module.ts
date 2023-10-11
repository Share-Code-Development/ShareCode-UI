import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeHighlighterComponent } from './code-highlighter.component';
import { SharedModule } from 'primeng/api';
import { NgxCodejarModule } from 'ngx-codejar';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [CodeHighlighterComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxCodejarModule,
    MonacoEditorModule,
    FormsModule
  ],
  exports: [CodeHighlighterComponent]
})
export class CodeHighlighterModule { }
