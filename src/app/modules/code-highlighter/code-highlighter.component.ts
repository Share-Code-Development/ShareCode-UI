import { Component, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// @ts-ignore - no types available
import langDetector from 'lang-detector';

declare const monaco: typeof import('monaco-editor');


@Component({
  selector: 'app-code-highlighter',
  templateUrl: './code-highlighter.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CodeHighlighterComponent,
      multi: true
    }
  ]
})
export class CodeHighlighterComponent implements ControlValueAccessor {

  @Input() public code: string = '';

  public language: string = 'text';
  @Input('language') set setLanguage(val: string) {
    if (this.editor && val) {
      monaco.editor.setModelLanguage(this.editor.getModel(), val.toLowerCase());
    }
  }

  protected editorOptions: any = {
    theme: 'vs-dark',
    automaticLayout: true,
    scrollBeyondLastLine: false,
    language: this.language
  };

  private editor: any;

  constructor(
  ) {
  }

  @Input()
  public set readOnlyMode(val: boolean) {
    this.editorOptions = { ...this.editorOptions, readOnly: val };
  }

  guessCode() {
    let language = langDetector(this.code);
    console.log(language)
    if (language) {
      language = language.toLowerCase()
      if (this.editor && language && language !== 'unknown') {
        this.language = language;
        language = language.replace('c#', 'csharp');
        language = language.replace('c++', 'cpp');
        monaco.editor.setModelLanguage(this.editor.getModel(), language);
      }
    }
  }

  onEditorInit(editor: any) {
    this.editor = editor;
    this.guessCode()
  }

  writeValue(obj: string): void {
    this.code = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onChange = fn;
  }


  private onChange: any = () => {
  };

  private onTouched: any = () => {
  };

}
