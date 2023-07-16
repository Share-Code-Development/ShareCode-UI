import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeHighlighterComponent } from './code-highlighter.component';
import { SharedModule } from 'primeng/api';
import { NgxCodejarModule } from 'ngx-codejar';



@NgModule({
  declarations: [CodeHighlighterComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxCodejarModule,
  ],
  exports: [CodeHighlighterComponent]
})
export class CodeHighlighterModule { }
