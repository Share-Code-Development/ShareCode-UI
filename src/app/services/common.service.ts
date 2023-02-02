import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public wrapCode: boolean = false;
  public errorMessages = new Array<{ text: string, time: number, color: string }>();

  constructor(
  ) {
  }

  public showSuccess(message: string) {
    const item = {
      text: message,
      color: 'alert-success',
      time: new Date().getTime()
    }
    this.errorMessages.push(item);
    setTimeout(() => {
      this.errorMessages = this.errorMessages.filter(el => el !== item);
    }, 3000);
  }

  public showError(message: string) {
    const item = {
      text: message,
      color: 'alert-error',
      time: new Date().getTime()
    }
    this.errorMessages.push(item);
    setTimeout(() => {
      this.errorMessages = this.errorMessages.filter(el => el !== item);
    }, 3000);
  }

}
