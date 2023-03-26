import { Injectable } from '@angular/core';
import { ELocalStorage } from 'src/app/models/common.enum';
import { UserService } from '../user.service';

@Injectable({ providedIn: 'root' })
export class AppInitService {

    constructor(
        private userService: UserService
    ) { }

    init() {
        return new Promise<void>((resolve, _) => {
            const user = localStorage.getItem(ELocalStorage.currentUser) ? JSON.parse(localStorage.getItem(ELocalStorage.currentUser) || '') : null;
            const SSOType = localStorage.getItem(ELocalStorage.ssoType) || undefined;
            const token = localStorage.getItem(ELocalStorage.token) || null;
            if (token && user) {
                this.userService.setupAuthState(user, token, SSOType);
                this.userService.getProfileAsync
            }
            resolve();
        });
    }
}