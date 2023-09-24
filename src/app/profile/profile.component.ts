import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { User } from '../interfaces/user';
import { Store, select } from '@ngrx/store';
import { selectUser } from '../store/selectors/selectors';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  user?: User;

  user$ = this.store.pipe(select(selectUser));

  subscriptions: Subscription[] = [];

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    const subscription = this.user$.subscribe({
      next: (result) => {
        if (result) {
          this.successHandler(result);
        }
      },
    });

    this.subscriptions.push(subscription);
  }

  successHandler(user: User): void {
    this.user = user;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe);
  }
}
