import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnippetService {
  private snippetEndpoint = 'snippets';
  public refreshSnippets$ = new Subject<void>();

  constructor(
    private http: HttpService,
  ) { }

  public triggerRefreshSnippets() {
    this.refreshSnippets$.next();
  }

  public snippetPostAsync(body: any): Observable<any> {
    return this.http.postAsync(body, `${this.snippetEndpoint}`);
  }

  public mySnippetsListAsync(params: any = {}): Observable<any> {
    return this.http.getAsync(`${this.snippetEndpoint}/my-snippets`, params);
  }

}
