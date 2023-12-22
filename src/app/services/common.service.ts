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
  public doBurstNextAPICache = false;

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
      color: 'alert-success'
    }
    this.errorMessages.push(item);
    setTimeout(() => {
      this.errorMessages = this.errorMessages.filter(el => el !== item);
    }, 5000);
  }

  public showError(message: string | any, replaceContext?: Record<string, string>) {
    const item = {
      text: typeof message === 'string' ? message : this.getErrorMessages(message, replaceContext).join('\n'),
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

  public getErrorMessages(errorResponse: any, replaceContext?: Record<string, string>) {
    let finalMessages: string[] = [];
    if (errorResponse?.error?.errors?.length) {
      errorResponse.error = errorResponse.error.errors;
    }
    if (errorResponse?.error?.message) {
      finalMessages = [errorResponse.error.message];
    } else {
      // recursively get all strings from all the keys of the error object
      const errorObj = errorResponse.error;
      const errorFinder = (error: any): string[] => {
        const messages = [];
        for (const key in error) {
          if (error.hasOwnProperty(key)) {
            const value = error[key];
            if (typeof value === 'string' && !['propertyName'].includes(key)) {
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
        finalMessages = [...new Set(allErrors.filter(el => el))]; // removing empty strings
      } else {
        finalMessages = [errorResponse?.statusText ?? errorResponse?.message ?? 'Something went wrong'];
      }
    }
    if (replaceContext) {
      finalMessages = finalMessages.map(el => {
        el = el.replace(/\[(.*?)\]/g, (match, key) => replaceContext[key] || match); // replace all occurrences of [key] with value
        return el;
      })
    }
    return finalMessages;
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
