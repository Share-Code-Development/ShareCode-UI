import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-code-item',
  templateUrl: './code-item.component.html',
  styleUrls: ['./code-item.component.scss']
})
export class CodeItemComponent implements OnInit, OnChanges {

  @Input()
  public code = `Hello World!\n\n\n\n\n`;

  public lineCode = this.code.split('\n');

  public copied: boolean = false;

  constructor(
    public commonService: CommonService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.code) {
      this.lineCode.push('\n'.repeat(10));
      this.lineCode = this.code.split('\n');
    }
  }

  ngOnInit(): void {
  }

  onCopy() {
    navigator.clipboard.writeText(this.code.trim());
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }, 2000);
  }

}
