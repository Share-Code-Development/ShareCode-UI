import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '@app/services/user.service';
import { Subscription } from 'rxjs';
import { QueryListParams } from 'src/app/classes/QueryListParams';
import { IListResponse } from 'src/app/models/queryList.model';
import { ISnippetResponse } from 'src/app/models/snippet.interface';
import { CommonService } from 'src/app/services/common.service';
import { SnippetService } from 'src/app/services/snippet.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {

  protected mySnippets: ISnippetResponse[] = [];
  protected mySnippetQuery = new QueryListParams({ take: 3 });
  protected loadingMySnippets = false;
  protected trendingSnippets: ISnippetResponse[] = [];
  protected trendingSnippetQuery = new QueryListParams({ take: 6 });
  protected loadingTrendingSnippets = false;
  private subs: Subscription = new Subscription();

  constructor(
    private snippetService: SnippetService,
    private commonService: CommonService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    // waiting for api to be ready
    this.getMySnippets();
    // this.getTrendingSnippets();
    this.subs.add(this.snippetService.refreshSnippets$.subscribe(() => {
      this.getMySnippets();
      // this.getTrendingSnippets();
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
      next: (res) => {
        this.loadingTrendingSnippets = false;
        if (res?.entities?.length) {
          this.trendingSnippets = [...this.trendingSnippets, ...res.entities];
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
    this.userService.getMySnippetsAsync(this.userService.authUser$.value?.userId!, params, { recentSnippets: true }).subscribe({
      next: (res) => {
        this.loadingMySnippets = false;
        if (res?.entities?.length) {
          res.entities.forEach((snippet) => {
            snippet.owner = this.userService.authUser$.value!;
          })
          this.mySnippets = [...this.mySnippets, ...res.entities];
        }
      },
      error: (err: any) => {
        this.commonService.showError(err);
        this.loadingMySnippets = false;
      }
    })
  }

}
