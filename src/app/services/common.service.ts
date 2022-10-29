import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public wrapCode: boolean = false;
  private notyf = new Notyf();
  private previusMessage = '';

  constructor(
  ) {
  }

  public showSuccess(message: string) {
    if (this.previusMessage === message) {
      return;
    }
    this.previusMessage = message;
    setTimeout(() => {
      this.previusMessage = '';
    }, 2500);
    this.notyf.success({
      message
    });
  }

  public showError(message: string) {
    this.notyf.error({
      message
    });
  }

}
