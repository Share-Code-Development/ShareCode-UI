import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { ISnippet, ISnippetResponse } from '@app/models/snippet.interface';
import { IListResponse } from '@app/models/queryList.model';
import * as signalR from '@microsoft/signalr';
import { environment } from '@environment';
import { ELocalStorage } from 'src/app/models/common.enum';
import { ESnippetSignalREvents } from '@app/models/snippet.enum';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SnippetService {
  private snippetEndpoint = 'snippet';
  public refreshSnippets$ = new Subject<void>();
  private connection?: signalR.HubConnection;
  private snippetSubscription?: Subscription;

  constructor(
    private http: HttpService,
    private userService: UserService
  ) {
  }


  private startConnection(snippetId: string) {
    return new Observable<void>(observer => {
      const signalROptions: signalR.IHttpConnectionOptions = {
        withCredentials: true
      }
      if (this.userService.isLoggedIn) {
        signalROptions.accessTokenFactory = () => `Bearer ${localStorage.getItem(ELocalStorage.token)}`;
      }
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(`${environment.apiLiveUrl}/snippet?snippetId=${snippetId}`, signalROptions)
        .build();
      this.connection.start().then(() => {
        observer.next();
        observer.complete();
      }).catch(err => {
        observer.error(err);
      })
    })
  }

  public onSnippetMessages(snippetId: string) {
    return new Observable<any>((observer) => {
      if (this.connection) {
        this.connection.off(ESnippetSignalREvents.message);
      }
      this.snippetSubscription?.unsubscribe();
      this.snippetSubscription = this.startConnection(snippetId).subscribe({
        next: () => {
          this.connection?.on(ESnippetSignalREvents.message, (res) => {
            observer.next(res);
          })
        },
        error: (err) => {
          observer.error(err);
        }
      })
      return () => {
        // cleanup logic to stop listening for messages here
        this.snippetSubscription?.unsubscribe();
        this.connection?.off(ESnippetSignalREvents.message);
      };
    })
  }

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
