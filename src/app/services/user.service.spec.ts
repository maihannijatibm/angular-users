import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { APP_CONSTANTS } from '../app.constants';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  afterEach(() => {
    httpTestingController.verify();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user from get API call', (done: DoneFn) => {
    const user = { name: 'Bob', email: 'myemail@example.com' };

    service.get().subscribe((result) => {
      expect(user).toEqual(result);
      done();
    });

    const testRequest = httpTestingController.expectOne(
      APP_CONSTANTS.URLS.GET_USER
    );

    testRequest.flush(user);
  });

  it('should API call return success with successful user registration', (done: DoneFn) => {
    const user = {
      name: 'Bob',
      password: 'xy',
      email: 'myemail@example.com',
      bio: 'Hello',
    };

    const expectedResult = { success: true };

    service.create(user).subscribe((result) => {
      expect(expectedResult).toEqual(result);
      done();
    });

    const testRequest = httpTestingController.expectOne(
      APP_CONSTANTS.URLS.USER_REGISTRATION +
        '?name=' +
        user.name +
        '&password=' +
        user.password +
        '&email=' +
        user.email +
        '&bio=' +
        user.bio
    );

    testRequest.flush(expectedResult);
  });
});
