import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-code-item',
  templateUrl: './code-item.component.html',
  styleUrls: ['./code-item.component.scss']
})
export class CodeItemComponent implements OnInit {

  @Input()
  public code = `int myFunction() {
  int a = 0;
  return a;
  a=1;
  a=1;
  a=1;
  a=1;
  a=1;
}`;

  public copied: boolean = false;

  constructor(
    public commonService: CommonService
  ) { }

  ngOnInit(): void {
  }

  onCopy() {
    navigator.clipboard.writeText(this.code.trim()).then(() => {
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
      this.commonService.showSuccess('Copied to clipboard')
    }).catch(() => this.commonService.showError('Failed to copy to clipboard'));
  }

}
