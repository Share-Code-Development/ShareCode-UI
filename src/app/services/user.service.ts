import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ELocalStorage } from '../models/common.enum';
import { IUser } from '../models/user.interface';
import { CommonService } from './common.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public authState$: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);
  public isLoggedIn = false;
  public isSSOLogin = false;
  private authEndpoint = 'auth';
  private userEndPoint = 'user';

  constructor(
    private http: HttpService,
    private socialAuthService: SocialAuthService,
    private router: Router,
    private commonService: CommonService
  ) {
    this.socialAuthService.authState.subscribe((user) => {
      if (!user) return;
      const body = {
        fullName: user.name,
        email: user.email,
        image: user.photoUrl,
        idToken: user.idToken
      }
      this.googleLoginAsync(body).subscribe({
        next: (res) => {
          this.setupAuthState(res.user, res.token, user.provider);
          this.router.navigate(['/dashboard'], { replaceUrl: true })
        },
        error: (err) => {
          this.commonService.showError(err);
        }
      });
    });
  }

  public setupAuthState(user: IUser, token: string, social?: string) {
    this.authState$.next(user);
    this.isLoggedIn = true;
    localStorage.setItem(ELocalStorage.currentUser, JSON.stringify(user));
    this.isSSOLogin = !!social;
    if (social) {
      localStorage.setItem(ELocalStorage.ssoType, social);
    }
    if (token) {
      localStorage.setItem(ELocalStorage.token, token);
    }
    document.body.style.setProperty(`--google-onetap-visibility`, 'none');
  }

  public async logout() {
    this.authState$.next(null);
    this.isLoggedIn = false;
    localStorage.removeItem(ELocalStorage.currentUser);
    localStorage.removeItem(ELocalStorage.token);
    localStorage.removeItem(ELocalStorage.ssoType);
    if (this.isSSOLogin) {
      await this.socialAuthService.signOut();
    }
    document.body.style.setProperty(`--google-onetap-visibility`, 'block');
  }


  public loginAsync(body: any): Observable<{ user: IUser, token: string }> {
    return this.http.postAsync(body, `${this.authEndpoint}/login`)
  }

  public signupAsync(body: IUser) {
    return this.http.postAsync(body, `${this.authEndpoint}/signup`)
  }

  public googleLoginAsync(body: any): Observable<{ user: IUser, token: string }> {
    return this.http.postAsync(body, `${this.authEndpoint}/google`)
  }

  public forgotPasswordAsync(body: any) {
    return this.http.postAsync(body, `${this.authEndpoint}/forgot-password`)
  }

  public resetPasswordAsync(body: any) {
    return this.http.postAsync(body, `${this.authEndpoint}/reset-password`)
  }

  public getProfileAsync(params?: any): Observable<{ user: IUser, token: string }> {
    return this.http.getAsync(`${this.authEndpoint}/profile`, params)
  }

}
