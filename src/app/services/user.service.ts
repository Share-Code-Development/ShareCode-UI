import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../models/user.interface';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public authState$: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);
  private authEndpoint = 'auth';
  private userEndPoint = 'user';

  constructor(
    private http: HttpService
  ) { }


  public loginAsync(body: any) {
    return this.http.postAsync(body, `${this.authEndpoint}/login`)
  }

  public signupAsync(body: IUser) {
    return this.http.postAsync(body, `${this.authEndpoint}/signup`)
  }

}
