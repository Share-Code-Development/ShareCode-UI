import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { UserService } from '../user.service';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
import { ELocalStorage } from '@app/models/common.enum';
import { environment } from '@environment';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

    constructor(
        private userService: UserService,
        private commonService: CommonService,
        private router: Router,
        private http: HttpClient
    ) { }

    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Check if the request requires authorization
        if (request.headers.has('Authorization')) {

            // Intercept the response
            return next.handle(request).pipe(
                catchError(error => {
                    // Check if the response status is 401 (Unauthorized)
                    if (error.status === 401) {
                        // Check if the refresh token is available
                        if (this.hasRefreshToken() && !request.url.endsWith('auth/refresh')) {
                            // Check if the refresh token is being refreshed
                            if (!this.isRefreshing) {
                                this.isRefreshing = true;
                                this.refreshTokenSubject.next(null);

                                // Call the API to refresh the authorization token
                                return this.refreshToken().pipe(
                                    switchMap((response: any) => {
                                        this.isRefreshing = false;
                                        this.refreshTokenSubject.next(response.refreshToken);
                                        return next.handle(this.addAuthorizationHeader(request));
                                    }),
                                    catchError((refreshError: any) => {
                                        this.isRefreshing = false;
                                        this.userService.logout();
                                        this.commonService.showError('Session expired. Please login again');
                                        this.router.navigate(['/login']);
                                        return throwError(() => refreshError);
                                    })
                                );
                            } else {
                                // Wait for the token to be refreshed
                                return this.refreshTokenSubject.pipe(
                                    filter(token => token !== null),
                                    take(1),
                                    switchMap(() => next.handle(this.addAuthorizationHeader(request)))
                                );
                            }
                        } else {
                            // Handle the missing refresh token error
                            return throwError(() => error);
                        }
                    } else {
                        // Handle other errors
                        return throwError(() => error);
                    }
                })
            );
        } else {
            // No authorization header, proceed with the request
            return next.handle(request);
        }
    }

    private addAuthorizationHeader(request: HttpRequest<any>): HttpRequest<any> {
        const token = localStorage.getItem(ELocalStorage.token);
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    private hasRefreshToken(): boolean {
        const refreshToken = localStorage.getItem(ELocalStorage.refreshToken);
        return refreshToken !== null;
    }

    private refreshToken(): Observable<any> {
        return this.http.get([environment.apiUrl, 'auth', 'refresh'].join('/'), {
            headers: {
                "XCS-Refresh-Token": localStorage.getItem(ELocalStorage.refreshToken) || ""
            },
            observe: 'response'
        }).pipe(map((res: any) => {
            const authToken: string = res.headers.get('Authorization');
            const refreshToken: string = res.headers.get('Refreshtoken');
            localStorage.setItem(ELocalStorage.token, authToken);
            localStorage.setItem(ELocalStorage.refreshToken, refreshToken);
            return { refreshToken, authToken };
        }));
    }
}
