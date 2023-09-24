import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { APP_CONSTANTS } from '../app.constants';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly httpClient: HttpClient) {}

  create(): Observable<any> {
    return this.httpClient.get(APP_CONSTANTS.USER_REGISTRATION_URL);
  }

  get(): Observable<User> {
    return this.httpClient.get<User>(APP_CONSTANTS.GET_USER_URL);
  }
}
