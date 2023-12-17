import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, firstValueFrom, map, of, switchMap } from 'rxjs';
import { ELocalStorage } from '../models/common.enum';
import { IUser } from '../models/user.interface';
import { CommonService } from './common.service';
import { HttpService } from './http.service';
import { ConfigService } from './config.service';
import { EAuthType, ILoginResponse } from '@app/models/auth.model';
import { Prettify } from '@app/models/common.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public authUser$: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);
  public isLoggedIn = false;
  public isSSOLogin = false;
  private authEndpoint = 'auth';
  private userEndPoint = 'user';
  public profileUrl: string = '';

  constructor(
    private http: HttpService,
    private socialAuthService: SocialAuthService,
    private router: Router,
    private commonService: CommonService,
    private config: ConfigService
  ) {
    this.socialAuthService.authState.subscribe((user) => {
      if (!user) return;
      const body = {
        type: EAuthType.google,
        idToken: user.idToken
      }
      const loader = this.commonService.showLoading('Logging in...');
      this.loginAsync(body).subscribe({
        next: (res) => {
          loader.stop();
          this.setupAuthState(res, res.accessToken, user.provider);
          this.router.navigate(['/dashboard'], { replaceUrl: true })
        },
        error: (err) => {
          loader.stop();
          this.commonService.showError(err);
        }
      });
    });
  }
  
  public async setupAuthState(user: IUser, token: string, social?: string) {
    if (!user) return;
    this.authUser$.next(user);
    this.isLoggedIn = true;
    // user.image = user.image ? user.image : (await firstValueFrom(this.profileImage(user.fullName))) || this.config.maleAvatarUrl;
    localStorage.setItem(ELocalStorage.currentUser, JSON.stringify(user));
    this.isSSOLogin = !!social;
    if (social) {
      localStorage.setItem(ELocalStorage.ssoType, social);
    }
    if (token) {
      localStorage.setItem(ELocalStorage.token, token);
    }
    // this.profileUrl = user.image;
  }

  public async logout() {
    this.authUser$.next(null);
    this.isLoggedIn = false;
    this.profileUrl = '';
    localStorage.removeItem(ELocalStorage.currentUser);
    localStorage.removeItem(ELocalStorage.token);
    localStorage.removeItem(ELocalStorage.ssoType);
    if (this.isSSOLogin) {
      await this.socialAuthService.signOut();
    }
  }

  private profileImage(name: string) {
    return this.commonService.isUserFemaleAsync(name).pipe(map(res => ((res) ? this.config.femaleAvatarUrl : this.config.maleAvatarUrl)))
  }


  public loginAsync(body: any): Observable<Prettify<IUser & ILoginResponse>> {
    return this.http.postAsync(body, `${this.authEndpoint}/login`)
  }

  public signupAsync(body: IUser) {
    return this.http.postAsync(body, `${this.authEndpoint}/register`)
  }

  public forgotPasswordAsync(body: any) {
    return this.http.postAsync(body, `${this.authEndpoint}/forgot-password`)
  }

  public getProfileAsync(params?: any): Observable<{ user: IUser, token: string }> {
    return this.http.getAsync(`${this.authEndpoint}/profile`, params)
  }

}
