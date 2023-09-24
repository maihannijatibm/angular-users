import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  user?: User;

  isLoading: boolean = false;

  error: boolean = false;

  subscriptions: Subscription[] = [];

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(): void {
    this.isLoading = true;
    this.error = false;

    const subscription = this.userService.get().subscribe({
      next: (result) => this.successHandler(result),
      error: (error) => this.errorHandler(error),
      complete: () => (this.isLoading = false),
    });

    this.subscriptions.push(subscription);
  }

  successHandler(user: User): void {
    this.user = user;
  }

  errorHandler(error: any): void {
    this.error = true;
    console.log(error);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe);
  }
}
