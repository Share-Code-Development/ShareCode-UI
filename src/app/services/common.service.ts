import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public wrapCode: boolean = false;
  public errorMessages = new Array<{ text: string, color: string }>();

  constructor(
  ) {
  }

  public showSuccess(message: string) {
    const item = {
      text: message,
      color: 'alert-success'
    }
    this.errorMessages.push(item);
    setTimeout(() => {
      this.errorMessages = this.errorMessages.filter(el => el !== item);
    }, 3000);
  }

  public showError(message: string) {
    const item = {
      text: message,
      color: 'alert-error'
    }
    this.errorMessages.push(item);
    setTimeout(() => {
      this.errorMessages = this.errorMessages.filter(el => el !== item);
    }, 3000);
  }

}
