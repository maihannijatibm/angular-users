import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { APP_CONSTANTS } from '../app.constants';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly httpClient: HttpClient) {}

  create(user: User): Observable<any> {
    const params = new HttpParams()
      .set('name', user.name)
      .set('password', user.password)
      .set('email', user.email)
      .set('bio', user.bio);
    return this.httpClient.get(APP_CONSTANTS.URLS.USER_REGISTRATION, {
      params,
    });
  }

  get(): Observable<User> {
    return this.httpClient.get<User>(APP_CONSTANTS.URLS.GET_USER);
  }
}
