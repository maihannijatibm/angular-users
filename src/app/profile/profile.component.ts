import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { User } from '../interfaces/user';
import { Store } from '@ngrx/store';
import { selectUser } from '../store/selectors/selectors';
import * as UserActions from '../store/actions/actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  user?: User;

  user$ = this.store.select(selectUser);

  subscriptions: Subscription[] = [];

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(UserActions.getUser());

    const subscription = this.user$.subscribe({
      next: (result) => {
        if (result) {
          this.user = result;
        }
      },
    });

    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe);
  }
}
