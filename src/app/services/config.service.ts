import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  public readonly defaultDialogStyles = { "max-height": "calc(100vh - 120px)", "overflow": "auto", "background-color": "transparent", "padding": "0px" };
  public readonly emailRegex: RegExp = /(.+)@(.+){2,}\.(.+){2,}/;
  public readonly passwordMinLength: number = 6;
  public readonly nameMinLength: number = 3;
  public readonly maleAvatarUrl = '/assets/images/male-avatar.svg'
  public readonly femaleAvatarUrl = '/assets/images/female-avatar.svg'

}
