import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent implements OnInit {

  constructor(
    public ref: DynamicDialogRef
  ) { }

  ngOnInit() {
  }

  public close() {
    this.ref.close(false);
  }

  public onDelete(value: boolean) {
    this.ref.close(value);
  }
}
