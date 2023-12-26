import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ELocalStorage } from 'src/app/models/common.enum';
import { environment } from 'src/environments/environment';
import { CommonService } from '../common.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(
    private commonService: CommonService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(ELocalStorage.token);
    console.log(request.body)
    if (request.url.startsWith(environment.apiUrl)) {
      const newHeaders: any = {
        Authorization: `Bearer ${token}`
      };
      if (this.commonService.doBurstNextAPICache) {
        newHeaders['Cache-Control'] = 'no-cache';
        newHeaders['Pragma'] = 'no-cache';
        newHeaders['Expires'] = '0';
        this.commonService.doBurstNextAPICache = false;
      }
      if (token) {
        request = request.clone({
          setHeaders: newHeaders,
          withCredentials: true
        });
      } else {
        const newCacheBurstHeaders = {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0'
        };
        request = request.clone({
          withCredentials: true,
          setHeaders: this.commonService.doBurstNextAPICache ? newCacheBurstHeaders : {}
        });
        this.commonService.doBurstNextAPICache = false;
      }
    }
    return next.handle(request);
  }
}
