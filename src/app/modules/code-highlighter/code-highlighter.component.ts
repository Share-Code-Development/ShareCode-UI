import {AfterViewInit, Component, ElementRef, Input, OnDestroy, Renderer2} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import hljs from 'highlight.js';
import {CodeJarContainer} from 'ngx-codejar';
// @ts-ignore - no types available
import guessProgrammingLanguage from 'guess-programming-language'


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
export class CodeHighlighterComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {

  @Input() public code: string = '';

  @Input() language: string = 'javascript';
  public readOnlyMode$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private renderer: Renderer2,
    private element: ElementRef
  ) {
  }

  @Input()
  public set readOnlyMode(val: boolean) {
    this.readOnlyMode$.next(val);
  }

  ngAfterViewInit(): void {
    this.readOnlyMode$.subscribe(val => {
      if (val) {
        this.renderer.setAttribute(this.element.nativeElement?.querySelector('.editor.hljs.ngx-codejar-editor'), 'contenteditable', 'false');
      } else {
        this.renderer.setAttribute(this.element.nativeElement?.querySelector('.editor.hljs.ngx-codejar-editor'), 'contenteditable', 'plaintext-only');
      }
    })
  }

  ngOnDestroy(): void {
    this.readOnlyMode$.unsubscribe();
  }

  public highlightMethod = (editor: CodeJarContainer) => {
    if (editor.textContent !== null && editor.textContent !== undefined) {
      editor.innerHTML = hljs.highlight(editor.textContent, {
        language: this.language
      }).value;
      guessProgrammingLanguage(editor.textContent).then((language: string) => {
        if (language) {
          this.language = language;
        }
      })
    }
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

  setDisabledState(isDisabled: boolean): void {
    this.readOnlyMode$.next(isDisabled);
  }

  private onChange: any = () => {
  };

  private onTouched: any = () => {
  };

}
