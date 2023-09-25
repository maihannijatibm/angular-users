import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { ProfileComponent } from './profile.component';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { UserState } from '../store/reducers/reducer';
import { of } from 'rxjs/internal/observable/of';
import * as UserActions from '../store/actions/actions';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let mockStore: MockStore<UserState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(), RouterModule, MatCardModule],
      declarations: [ProfileComponent],
      providers: [
        provideMockStore({
          initialState: {
            user: undefined,
            registration: {
              success: false,
              error: false,
            },
          },
        }),
      ],
    });
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockStore = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('assign user in result of user$', () => {
    const user = {
      name: 'Bob',
      password: 'xy',
      email: 'xy@example.com',
      bio: 'Hello world!',
    };

    component.user$ = of(user);

    const getCallSpy = spyOn(mockStore, 'dispatch').and.callThrough();

    component.ngOnInit();

    expect(component.user).toEqual(user);
    expect(getCallSpy).toHaveBeenCalledWith(UserActions.getUser());
  });
});
