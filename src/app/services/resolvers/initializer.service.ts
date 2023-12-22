import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ELocalStorage } from 'src/app/models/common.enum';
import { CommonService } from '../common.service';
import { UserService } from '../user.service';
import { IUser } from '@app/models/user.interface';

@Injectable({ providedIn: 'root' })
export class AppInitService {

    constructor(
        private userService: UserService,
        private router: Router,
        private commonService: CommonService
    ) { }

    init() {
        return new Promise<void>((resolve, _) => {
            const user: IUser = localStorage.getItem(ELocalStorage.currentUser) ? JSON.parse(localStorage.getItem(ELocalStorage.currentUser) || '') : null;
            const SSOType = localStorage.getItem(ELocalStorage.ssoType) || undefined;
            const token = localStorage.getItem(ELocalStorage.token) || null;
            if (token && user) { // if sso login, google will handle the auth state in user service
                this.userService.setupAuthState(user, token, SSOType);
                resolve();
                this.commonService.doBurstNextAPICache = true;
                this.userService.getByIdAsync(user.userId!).subscribe({
                    next: res => {
                        this.userService.setupAuthState(res, res.accessToken, SSOType);
                    },
                    error: () => {
                        this.userService.logout();
                        if (this.router.url !== '/login' && !this.router.url.includes('/common') && !this.router.url.includes('/gateway')) {
                            this.router.navigate(['/login']);
                            this.commonService.showError('Session expired. Please login again.');
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