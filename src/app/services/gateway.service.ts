import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { EGatewayType } from '@app/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class GatewayService {

  constructor(
    private http: HttpService
  ) { }

  // #region Gateway
  public verifyUserAccountAsync(type: EGatewayType, token: string) {
    return this.http.patchAsync(`gateway/${type}/${token}`, {});
  }

  public forgotPasswordAsync(type: EGatewayType, token: string, body: { newPassword: string }) {
    return this.http.patchAsync(`gateway/${type}/${token}`, body);
  }

}
