import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable, firstValueFrom, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DeleteConfirmationComponent } from '../shared/delete-confirmation/delete-confirmation.component';
import { ConfigService } from './config.service';
import { INotificationConfig } from '../models/common.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public wrapCode: boolean = false;
  public errorMessages = new Array<INotificationConfig>();
  public authRedirectUrl: string = '';
  private nameGenderCache = new Map<string, boolean>();

  constructor(
    private http: HttpClient,
    public dialogService: DialogService,
    private config: ConfigService
  ) {
  }

  public showLoading(message?: string): Required<INotificationConfig> {
    const item: Required<INotificationConfig> = {
      text: message || 'Please wait...',
      color: 'alert-info',
      isLoading: true,
      stop: () => {
        this.errorMessages = this.errorMessages.filter(el => el !== item);
      },
      success: (text) => {
        item.color = 'alert-success';
        item.isLoading = false;
        item.text = text;
        setTimeout(() => {
          this.errorMessages = this.errorMessages.filter(el => el !== item);
        }, 5000);
      },
      error: (error) => {
        item.color = 'alert-error';
        item.isLoading = false;
        item.text = typeof error === 'string' ? error : this.getErrorMessages(error).join('\n')
        setTimeout(() => {
          this.errorMessages = this.errorMessages.filter(el => el !== item);
        }, 5000);
      }
    }
    this.errorMessages.push(item);
    return item;
  }

  public showSuccess(message: string) {
    const item = {
      text: message,
      color: 'alert-success',
      error() { },
      success() { },
      stop() { }
    }
    this.errorMessages.push(item);
    setTimeout(() => {
      this.errorMessages = this.errorMessages.filter(el => el !== item);
    }, 5000);
  }

  public showError(message: string | any) {
    const item = {
      text: typeof message === 'string' ? message : this.getErrorMessages(message).join('\n'),
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

  public isUserFemaleAsync(name: string) {
    JSON.stringify(JSON.parse('{}'), (k, v) => {
      if (k === 'password') {
        return undefined;
      }
      return v;
    });
    if (this.nameGenderCache.has(name)) {
      return of(this.nameGenderCache.get(name));
    }
    return this.http.get(`https://api.genderize.io/?name=${name}`).pipe(map(
      (res: any) => {
        let value = res.gender === 'female';
        this.nameGenderCache.set(name, value);
        return value;
      }
    ), catchError(() => {
      return of(false)
    }))
  }

  public showDeleteConfirmationAsync() {
    return firstValueFrom(this.dialogService.open(DeleteConfirmationComponent, {
      header: 'Create',
      contentStyle: this.config.defaultDialogStyles,
      showHeader: false,
      baseZIndex: 10000,
      dismissableMask: true,
    }).onClose)
  }

  public getLanguages(): Observable<any[]> {
    return this.http.get<any[]>('/assets/common/languages.json');
  }

}
