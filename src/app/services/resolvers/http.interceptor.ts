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

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(ELocalStorage.token);
    if (request.url.startsWith(environment.apiUrl)) {
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        });
      } else {
        request = request.clone({
          withCredentials: true
        });
      }
    }
    return next.handle(request);
  }
}
