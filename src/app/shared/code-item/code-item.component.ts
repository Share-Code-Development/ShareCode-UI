import { Component, Input, OnInit } from '@angular/core';
import { ISnippet } from 'src/app/models/snippet.interface';
import { CommonService } from 'src/app/services/common.service';
import { SnippetService } from 'src/app/services/snippet.service';

@Component({
  selector: 'app-code-item',
  templateUrl: './code-item.component.html',
  styleUrls: ['./code-item.component.scss']
})
export class CodeItemComponent implements OnInit {

  @Input() public codeItem!: ISnippet;

  public copied: boolean = false;

  constructor(
    public commonService: CommonService,
    private snippetService: SnippetService
  ) { }

  ngOnInit(): void {
  }

  onCopy() {
    // navigator.clipboard.writeText(this.code.trim()).then(() => {
    //   this.copied = true;
    //   setTimeout(() => {
    //     this.copied = false;
    //   }, 2000);
    // }).catch(() => this.commonService.showError('Failed to copy to clipboard'));
  }

  public onDelete() {
    this.commonService.showDeleteConfirmationAsync().then((confirmation) => {
      if (!confirmation) return;
      if (this.codeItem) {
        this.snippetService.deleteSnippetAsync(this.codeItem._id!).subscribe({
          next: () => {
            this.commonService.showSuccess('Snippet deleted successfully');
            this.snippetService.triggerRefreshSnippets();
          },
          error: (err: any) => {
            this.commonService.showError(err);
          }
        })
      }
    })
  }

}
