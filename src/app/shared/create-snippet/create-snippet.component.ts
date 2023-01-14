import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-create-snippet',
  templateUrl: './create-snippet.component.html',
  styleUrls: ['./create-snippet.component.scss']
})
export class CreateSnippetComponent implements OnInit, AfterViewInit {

  constructor(
    public ref: DynamicDialogRef
  ) { }
  
  content = 'int myFunction() {}'

  onCodeChanged(value: any) {
    console.log('CODE', value);
  }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }

  public close() {
    this.ref.close();
  }

}
