import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ELocalStorage } from '../models/common.enum';
import { IUser } from '../models/user.interface';
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
    private socialAuthService: SocialAuthService
  ) { }

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
  }


  public loginAsync(body: any) {
    return this.http.postAsync(body, `${this.authEndpoint}/login`)
  }

  public signupAsync(body: IUser) {
    return this.http.postAsync(body, `${this.authEndpoint}/signup`)
  }

  public googleLoginAsync(body: any) {
    return this.http.postAsync(body, `${this.authEndpoint}/google`)
  }

  public forgotPasswordAsync(body: any) {
    return this.http.postAsync(body, `${this.authEndpoint}/forgot-password`)
  }

  public resetPasswordAsync(body: any) {
    return this.http.postAsync(body, `${this.authEndpoint}/reset-password`)
  }

}
