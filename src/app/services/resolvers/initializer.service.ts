import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ELocalStorage } from 'src/app/models/common.enum';
import { CommonService } from '../common.service';
import { UserService } from '../user.service';

@Injectable({ providedIn: 'root' })
export class AppInitService {

    constructor(
        private userService: UserService,
        private router: Router,
        private commonService: CommonService
    ) { }

    init() {
        return new Promise<void>((resolve, _) => {
            const user = localStorage.getItem(ELocalStorage.currentUser) ? JSON.parse(localStorage.getItem(ELocalStorage.currentUser) || '') : null;
            const SSOType = localStorage.getItem(ELocalStorage.ssoType) || undefined;
            const token = localStorage.getItem(ELocalStorage.token) || null;
            if (token && user) { // if sso login, google will handle the auth state in user service
                this.userService.setupAuthState(user, token, SSOType);
                this.userService.getProfileAsync().subscribe({
                    next: res => {
                        this.userService.setupAuthState(res.user, res.token, SSOType);
                        resolve();
                    },
                    error: err => {
                        this.userService.logout();
                        this.router.navigate(['/login']);
                        this.commonService.showError('Session expired. Please login again.');
                        resolve();
                    }
                })
            } else {
                resolve();
            }
        });
    }
}