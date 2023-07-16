import { Component, OnInit } from '@angular/core';
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
