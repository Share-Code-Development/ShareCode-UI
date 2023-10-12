import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnippetService {
  private snippetEndpoint = 'snippets';

  constructor(    
    private http: HttpService,
  ) { }

  public snippetPostAsync(body: any): Observable<any> {
    return this.http.postAsync(body, `${this.snippetEndpoint}`);
  }

}
