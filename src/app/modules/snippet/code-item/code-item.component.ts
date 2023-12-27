import { Component, Input, OnInit } from '@angular/core';
import { ISnippetResponse } from 'src/app/models/snippet.interface';
import { CommonService } from 'src/app/services/common.service';
import { ConfigService } from 'src/app/services/config.service';
import { SnippetService } from 'src/app/services/snippet.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-code-item',
  templateUrl: './code-item.component.html',
  styleUrls: ['./code-item.component.scss']
})
export class CodeItemComponent implements OnInit {

  @Input() public codeItem!: ISnippetResponse;

  public copied: boolean = false;
  protected languageName: string = '';
  protected isAuthor: boolean = false;
  protected copyLoading: boolean = false;
  protected loadingLike: boolean = false;
  private copiedOnce: boolean = false;

  constructor(
    public commonService: CommonService,
    private snippetService: SnippetService,
    private userService: UserService,
    protected config: ConfigService
  ) { }

  ngOnInit(): void {
    this.commonService.getLanguages().subscribe((res: any) => {
      const language = res.find((l: any) => l.id === this.codeItem.language);
      this.languageName = language?.name || '';
    });
    this.isAuthor = this.userService.authUser$.value?.userId === this.codeItem.owner?.userId;
    this.codeItem.createdAt = new Date(this.codeItem.createdAt);
  }

  onCopy() {
    this.copyLoading = true;
    this.snippetService.getCodeByIdAsync(this.codeItem.id!).subscribe({
      next: (res) => {
        this.copyLoading = false;
        navigator.clipboard.writeText(res?.code?.trim() || '').then(() => {
          this.copied = true;
          setTimeout(() => {
            this.copied = false;
          }, 2000);
          if (!this.copiedOnce) {
            // this.snippetService.patchCopyAsync(this.codeItem.id!).subscribe({
            //   next: () => {
            //     this.codeItem.copies++;
            //     this.copiedOnce = true;
            //   },
            //   error: (err) => {
            //     this.commonService.showError(err);
            //   }
            // });
          }
        }).catch(() => this.commonService.showError('Failed to copy to clipboard'));
      },
      error: (err) => {
        this.copyLoading = false;
        this.commonService.showError(err);
      }
    })
  }

  public onDelete() {
    this.commonService.showDeleteConfirmationAsync().then((confirmation) => {
      if (!confirmation) return;
      if (this.codeItem) {
        const loader = this.commonService.showLoading("Deleting snippet...");
        this.snippetService.deleteSnippetAsync(this.codeItem.id!).subscribe({
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

  protected onLike() {
  //   if (this.codeItem.selfLiked) {
  //     this.loadingLike = true;
  //     this.codeItem.likeCount--;
  //     this.codeItem.selfLiked = false;
  //     this.snippetService.deleteLikeAsync(this.codeItem.id!, this.userService.authUser$.value?.userId!).subscribe({
  //       next: () => {
  //         this.loadingLike = false;
  //       },
  //       error: (err) => {
  //         this.loadingLike = false;
  //         this.codeItem.likeCount++;
  //         this.codeItem.selfLiked = true;
  //         this.commonService.showError(err);
  //       }
  //     })
  //   } else {
  //     this.loadingLike = true;
  //     this.codeItem.likeCount++;
  //     this.codeItem.selfLiked = true;
  //     this.snippetService.postLikeAsync(this.codeItem.id!).subscribe({
  //       next: () => {
  //         this.loadingLike = false;
  //       },
  //       error: (err) => {
  //         this.loadingLike = false;
  //         this.codeItem.likeCount--;
  //         this.codeItem.selfLiked = false;
  //         this.commonService.showError(err);
  //       }
  //     })
  //   }
  }

}
