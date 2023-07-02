import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public wrapCode: boolean = false;
  public errorMessages = new Array<{ text: string, color: string }>();
  public authRedirectUrl: string = '';

  constructor(
    private http: HttpClient
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
    const errorFinder = (error: any): string[] => {
      const messages = [];
      for (const key in error) {
        if (error.hasOwnProperty(key)) {
          const value = error[key];
          if (typeof value === 'string') {
            messages.push(value);
          } else if (typeof value === 'object') {
            messages.push(...errorFinder(value));
          }
        }
      }
      return messages;
    }
    let allErrors: string[] = [];
    if (typeof errorObj === 'object') {
      allErrors = errorFinder(errorObj);
    }
    if (allErrors.length) {
      return allErrors.filter(el => el); // removing empty strings
    } else {
      return [error?.statusText ?? error?.message ?? 'Something went wrong'];
    }
  }

  private nameGenderCache = new Map<string, boolean>();
  public isUserFemaleAsync(name: string) {
    if (this.nameGenderCache.has(name)) {
      return of(this.nameGenderCache.get(name));
    }
    return this.http.get(`https://api.genderize.io/?name=${name}`).pipe(map(
      (res: any) => {
        let value = res.gender === 'female' ? true : false;
        this.nameGenderCache.set(name, value);
        return value;
      }
    ), catchError(() => {
      return of(false)
    }))
  }

}
