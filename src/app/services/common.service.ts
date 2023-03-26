import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public wrapCode: boolean = false;
  public errorMessages = new Array<{ text: string, color: string }>();
  public authRedirectUrl: string = '';

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
    }, 5000);
  }

  public showError(message: string | any) {
    const item = {
      text: typeof message === 'string' ? message : this.getErrorMessages(message)[0],
      color: 'alert-error'
    }
    this.errorMessages.push(item);
    setTimeout(() => {
      this.errorMessages = this.errorMessages.filter(el => el !== item);
    }, 5000);
  }

  public closeError(item: any) {
    this.errorMessages = this.errorMessages.filter(el => el !== item);
  }

  public getErrorMessages(error: any) {
    // recursively get all strings from all the keys of the error object
    const errorObj = error.error;
    const getErrorMessages = (error: any): string[] => {
      const messages = [];
      for (const key in error) {
        if (error.hasOwnProperty(key)) {
          const value = error[key];
          if (typeof value === 'string') {
            messages.push(value);
          } else if (typeof value === 'object') {
            messages.push(...getErrorMessages(value));
          }
        }
      }
      return messages;
    }
    let allErrors: string[] = [];
    if (typeof errorObj === 'object') {
      allErrors = getErrorMessages(errorObj);
    }
    if (allErrors.length) {
      return allErrors.filter(el => el); // removing empty strings
    } else {
      return [error?.statusText ?? error?.message ?? 'Something went wrong'];
    }
  }

}
