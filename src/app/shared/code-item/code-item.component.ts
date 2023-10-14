import { Component, Input, OnInit } from '@angular/core';
import { ISnippet } from 'src/app/models/snippet.interface';
import { CommonService } from 'src/app/services/common.service';
import { SnippetService } from 'src/app/services/snippet.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-code-item',
  templateUrl: './code-item.component.html',
  styleUrls: ['./code-item.component.scss']
})
export class CodeItemComponent implements OnInit {

  @Input() public codeItem!: ISnippet;

  public copied: boolean = false;
  protected languageName: string = '';
  protected isAuthor: boolean = false;

  constructor(
    public commonService: CommonService,
    private snippetService: SnippetService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.commonService.getLanguages().subscribe((res: any) => {
      const language = res.find((l: any) => l.id === this.codeItem.language);
      this.languageName = language?.name || '';
    });
    this.isAuthor = this.userService.authUser$.value?._id === this.codeItem.createdBy;
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
        const loader = this.commonService.showLoading("Deleting snippet...");
        this.snippetService.deleteSnippetAsync(this.codeItem._id!).subscribe({
          next: () => {
            loader.success('Snippet deleted successfully');
            this.snippetService.triggerRefreshSnippets();
          },
          error: (err: any) => {
            loader.error(err);
          }
        })
      }
    })
  }

}
