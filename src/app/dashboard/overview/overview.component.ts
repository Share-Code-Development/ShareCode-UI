import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { QueryListParams } from 'src/app/classes/QueryListParams';
import { IListResponse } from 'src/app/models/queryList.model';
import { ISnippet, TSnippetResponse } from 'src/app/models/snippet.interface';
import { CommonService } from 'src/app/services/common.service';
import { SnippetService } from 'src/app/services/snippet.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {

  protected mySnippets: TSnippetResponse[] = [];
  protected mySnippetQuery = new QueryListParams({ limit: 3 });
  protected loadingMySnippets = false;
  protected trendingSnippets: TSnippetResponse[] = [];
  protected trendingSnippetQuery = new QueryListParams({ limit: 6 });
  protected loadingTrendingSnippets = false;
  private subs: Subscription = new Subscription();

  constructor(
    private snippetService: SnippetService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.getMySnippets();
    this.getTrendingSnippets();
    this.subs.add(this.snippetService.refreshSnippets$.subscribe(() => {
      this.getMySnippets();
      this.getTrendingSnippets();
    }))
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private getTrendingSnippets(next: boolean = false) {
    let params = {};
    if (next) {
      params = this.trendingSnippetQuery.getNextQuery();
    } else {
      params = this.trendingSnippetQuery.resetQuery();
      this.trendingSnippets = [];
    }
    this.loadingTrendingSnippets = true;
    this.snippetService.trendingSnippetsListAsync(params).subscribe({
      next: (res: IListResponse) => {
        this.loadingTrendingSnippets = false;
        if (res?.result?.length) {
          this.trendingSnippets = [...this.trendingSnippets, ...res.result];
        }
      },
      error: (err: any) => {
        this.commonService.showError(err);
        this.loadingTrendingSnippets = false;
      }
    })
  }

  private getMySnippets(next: boolean = false) {
    let params = {};
    if (next) {
      params = this.mySnippetQuery.getNextQuery();
    } else {
      params = this.mySnippetQuery.resetQuery();
      this.mySnippets = [];
    }
    this.loadingMySnippets = true;
    this.snippetService.mySnippetsListAsync(params).subscribe({
      next: (res: IListResponse) => {
        this.loadingMySnippets = false;
        if (res?.result?.length) {
          this.mySnippets = [...this.mySnippets, ...res.result];
        }
      },
      error: (err: any) => {
        this.commonService.showError(err);
        this.loadingMySnippets = false;
      }
    })
  }

}
