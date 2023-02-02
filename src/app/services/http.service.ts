import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) { }

  postAsync(body: any, endpoint: string): Observable<any> {
    return this.http.post<any>([this.baseUrl, endpoint].join('/'), body);
  }

  putAsync(body: any, endpoint: string): Observable<any> {
    return this.http.put<any>([this.baseUrl, endpoint].join('/'), body);
  }

  putByIdAsync(endpoint: string, id: string, body: any): Observable<any> {
    return this.http.put<any>([this.baseUrl, endpoint, id].join('/'), body);
  }

  getAsync(endpoint: string, params?: any): Observable<any> {
    return this.http.get<any>([this.baseUrl, endpoint].join('/'), { params });
  }

  deleteByIdAsync(endpoint: string, id: string): Observable<any> {
    return this.http.delete<any>([this.baseUrl, endpoint, id].join('/'));
  }

  deleteMultipleAsync(endpoint: string, body: any): Observable<any> {
    return this.http.delete<any>([this.baseUrl, endpoint].join('/'), { body });
  }

  getByIdAsync(endpoint: string, id: string): Observable<any> {
    return this.http.get<any>([this.baseUrl, endpoint, id].join('/'));
  }


}
