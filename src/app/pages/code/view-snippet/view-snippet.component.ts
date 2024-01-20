import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISnippet } from '@app/models/snippet.interface';
import { CommonService } from '@app/services/common.service';
import { SnippetService } from '@app/services/snippet.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-snippet',
  templateUrl: './view-snippet.component.html',
  styleUrl: './view-snippet.component.scss'
})
export class ViewSnippetComponent implements OnInit, OnDestroy {

  private codeId: string = '';
  public codeDetails: ISnippet | null = null;
  private sub: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private snippetService: SnippetService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.codeId = this.route.snapshot.params['id'];
    if (this.codeId) {
      const loader = this.commonService.showLoading();
      this.snippetService.getByIdAsync(this.codeId).subscribe({
        next: (res) => {
          this.codeDetails = res;
          loader.stop();
        },
        error: (err: any) => {
          loader.error(err);
        }
      });
      this.sub.add(
        this.snippetService.onSnippetMessages(this.codeId).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.error(err);
        }
      }))
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
