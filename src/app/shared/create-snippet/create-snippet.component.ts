import { Component, OnInit } from '@angular/core';
import hljs from 'highlight.js';
import { CodeJarContainer } from 'ngx-codejar';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-create-snippet',
  templateUrl: './create-snippet.component.html',
  styleUrls: ['./create-snippet.component.scss']
})
export class CreateSnippetComponent implements OnInit {

  public loading = false;

  constructor(
    public ref: DynamicDialogRef
  ) { }

  content = ``;


  highlightMethod(editor: CodeJarContainer) {
    if (editor.textContent !== null && editor.textContent !== undefined) {
      editor.innerHTML = hljs.highlight(editor.textContent, {
        language: 'javascript'
      }).value;
    }
  }


  onCodeChanged(value: any) {
    console.log('CODE', value);
  }

  ngOnInit(): void {
  }

  public close() {
    this.ref.close();
  }

  public onSave() {
    console.log(this.content)
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.close()
    }, 3000);
  }

}
