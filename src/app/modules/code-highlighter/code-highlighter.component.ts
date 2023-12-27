import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// @ts-expect-error - no types available
import langDetector from 'lang-detector';
import { Subject, debounceTime } from 'rxjs';

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

  private  _language: string = 'plain';
  @Input() public set language(val: string) {
    if (this.editor && val) {
      monaco.editor.setModelLanguage(this.editor.getModel(), val.toLowerCase());
    }
  }
  public get language() {
    return this._language;
  }

  @Input()
  public set readOnlyMiniMode(val: boolean) {
    this.editorOptions = {
      ...this.editorOptions,
      readOnly: val,
      scrollbar: {
        vertical: "hidden",
        horizontal: "hidden",
        handleMouseWheel: false,
      }
    };
  }

  @Input()
  public set readOnlyMode(val: boolean) {
    this.editorOptions = {
      ...this.editorOptions,
      readOnly: val
    };
  }

  @Input() public autoDetectLanguage: boolean = true;

  @Input() public set options(val: unknown) {
    if (!val) return;
    this.editorOptions = { ...this.editorOptions, ...val };
  }

  @Output() public languageChanged: EventEmitter<string> = new EventEmitter();

  protected editorOptions: any = {
    theme: 'vs-dark',
    automaticLayout: true,
    // scrollBeyondLastLine: false,
    language: this.language,
    scrollbar: {
      alwaysConsumeMouseWheel: false
    }
  };
  private customInput$: Subject<void> = new Subject();
  private editor: any;

  constructor(
  ) {
    this.customInput$.pipe(debounceTime(500)).subscribe(() => {
      if (!this.autoDetectLanguage || !this.code) return;
      let language = langDetector(this.code);
      if (language) {
        language = language.toLowerCase()
        if (this.editor && language && language !== 'unknown' && language !== this.language) {
          this.language = language;
          language = language.replace('c#', 'csharp');
          language = language.replace('c++', 'cpp');
          monaco.editor.setModelLanguage(this.editor.getModel(), language);
          this.languageChanged.emit(language);
        }
      }
    });
  }

  guessCode() {
    this.customInput$.next();
    this.onChange(this.code);
    this.onTouched();
  }

  onEditorInit(editor: any) {
    this.editor = editor;
    this.customInput$.next();
    const matches = editor.getModel().findMatches(/\(TRUNCATED:.+COPY.+OPEN.+\)/g, false, true, true, null, true); // Find matches using the regex source
    const decorations = matches.map((match: any) => {
      return {
        range: match.range, // Range of the matched text
        options: {
          isWholeLine: true,
          className: 'highlighted-line-truncated'
        },
      };
    });

    editor.deltaDecorations([], decorations);
  }

  writeValue(obj: string): void {
    this.code = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }


  private onChange: any = () => { };

  private onTouched: any = () => { };

}
