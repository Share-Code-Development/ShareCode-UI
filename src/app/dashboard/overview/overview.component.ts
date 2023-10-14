import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { QueryListParams } from 'src/app/classes/QueryListParams';
import { IListResponse } from 'src/app/models/queryList.model';
import { ISnippet } from 'src/app/models/snippet.interface';
import { CommonService } from 'src/app/services/common.service';
import { SnippetService } from 'src/app/services/snippet.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {

  protected mySnippets: ISnippet[] = [];
  protected mySnippetQuery = new QueryListParams({ limit: 6 });
  protected loadingMySnippets = false;
  private subs: Subscription = new Subscription();

  constructor(
    private snippetService: SnippetService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.getMySnippets();
    this.subs.add(this.snippetService.refreshSnippets$.subscribe(() => {
      this.getMySnippets();
    }))
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private getMySnippets(next: boolean = false) {
    let params = {};
    if (next) {
      params = this.mySnippetQuery.getNextQuery();
    } else {
      params = this.mySnippetQuery.resetQuery({ limit: 6 });
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
