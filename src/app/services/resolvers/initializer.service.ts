import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ELocalStorage } from 'src/app/models/common.enum';
import { CommonService } from '../common.service';
import { UserService } from '../user.service';
import { IUser } from '@app/models/user.interface';
import { ConfigService } from '../config.service';

@Injectable({ providedIn: 'root' })
export class AppInitService {

    constructor(
        private userService: UserService,
        private router: Router,
        private commonService: CommonService,
        private config: ConfigService
    ) { }

    init() {
        return new Promise<void>((resolve, _) => {
            const user: IUser = localStorage.getItem(ELocalStorage.currentUser) ? JSON.parse(localStorage.getItem(ELocalStorage.currentUser) || '') : null;
            const SSOType = localStorage.getItem(ELocalStorage.ssoType) || undefined;
            const token = localStorage.getItem(ELocalStorage.token) || null;
            const refreshToken = localStorage.getItem(ELocalStorage.refreshToken) || null;
            if (token && user) { // if sso login, google will handle the auth state in user service
                this.userService.setupAuthState(user, token, refreshToken, SSOType);
                resolve();
                this.commonService.doBurstNextAPICache = true;
                this.userService.getByIdAsync(user.userId!, null, { includeSettings: true }).subscribe({
                    next: (res) => {
                        this.userService.setupAuthState(res, res.accessToken, null, SSOType);
                    },
                    error: (error) => {
                        this.userService.logout();
                        if (!this.config.isPublicRoute(this.router.url)) {
                            this.router.navigate(['/login']);
                            if (error.status !== 401) { // 401 case, we will show the error in interceptor
                                this.commonService.showError('Session expired. Please login again.');
                            }
                        }
                        resolve();
                    }
                })
            } else {
                resolve();
            }
        });
    }
}