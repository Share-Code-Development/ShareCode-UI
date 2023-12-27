import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, Subject } from 'rxjs';
import { ISnippet, ISnippetResponse } from '@app/models/snippet.interface';
import { IListResponse } from '@app/models/queryList.model';

@Injectable({
  providedIn: 'root'
})
export class SnippetService {
  private snippetEndpoint = 'snippet';
  public refreshSnippets$ = new Subject<void>();

  constructor(
    private http: HttpService,
  ) { }

  public triggerRefreshSnippets() {
    this.refreshSnippets$.next();
  }

  public getByIdAsync(id: string): Observable<ISnippet> {
    return this.http.getAsync(`${this.snippetEndpoint}/${id}`);
  }

  public snippetPostAsync(body: any, options?: { public: boolean }): Observable<any> {
    let endpoint = this.snippetEndpoint;
    if (options?.public) {
      endpoint = `${endpoint}/public`;
    }
    return this.http.postAsync(body, endpoint);
  }

  public mySnippetsListAsync(params: any = {}): Observable<ISnippetResponse> {
    return this.http.getAsync(`${this.snippetEndpoint}/my-snippets`, params);
  }

  public trendingSnippetsListAsync(params: any = {}): Observable<IListResponse<ISnippetResponse>> {
    return this.http.getAsync(`${this.snippetEndpoint}/trending`, params);
  }

  public deleteSnippetAsync(id: string): Observable<any> {
    return this.http.deleteByIdAsync(this.snippetEndpoint, id);
  }

  public getCodeByIdAsync(id: string): Observable<any> {
    return this.http.getAsync(`${this.snippetEndpoint}/${id}/code`);
  }

  public postLikeAsync(id: string): Observable<any> {
    return this.http.postAsync({}, `${this.snippetEndpoint}/${id}/like`);
  }

  public deleteLikeAsync(snippetId: string, userId: string): Observable<any> {
    return this.http.deleteByIdAsync(`${this.snippetEndpoint}/${snippetId}/like`, userId);
  }

  public postCommentAsync(id: string, body: any): Observable<any> {
    return this.http.postAsync(body, `${this.snippetEndpoint}/${id}/comment`);
  }

  public deleteCommentAsync(snippetId: string, commentId: string): Observable<any> {
    return this.http.deleteByIdAsync(`${this.snippetEndpoint}/${snippetId}/comment`, commentId);
  }

  public patchCopyAsync(id: string): Observable<any> {
    return this.http.patchAsync(`${this.snippetEndpoint}/${id}/copies`);
  }


}
