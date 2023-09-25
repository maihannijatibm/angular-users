import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../interfaces/user';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUserRegistration } from '../store/selectors/selectors';
import { Router } from '@angular/router';
import { APP_CONSTANTS } from '../app.constants';
import * as UserActions from '../store/actions/actions';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  form?: FormGroup;

  controlNames = {
    name: 'name',
    password: 'password',
    email: 'email',
    bio: 'bio',
  };

  controlMaxLengths = {
    name: 64,
    password: 24,
    email: 64,
    bio: 256,
  };

  isLoading: boolean = false;

  error: boolean = false;

  registration$ = this.store.select(selectUserRegistration);

  subscriptions: Subscription[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.createForm();

    const subscription = this.registration$.subscribe({
      next: (result) => {
        if (result.success) {
          this.router.navigate([APP_CONSTANTS.ROUTES.profile]);
        } else if (result.error) {
          this.error = true;
        }
      },
    });

    this.subscriptions.push(subscription);
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(this.controlMaxLengths.name),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.maxLength(this.controlMaxLengths.password),
        ],
      ],
      email: [
        '',
        [Validators.email, Validators.maxLength(this.controlMaxLengths.email)],
      ],
      bio: [
        '',
        [Validators.required, Validators.maxLength(this.controlMaxLengths.bio)],
      ],
    });
  }

  onFormSubmit(): void {
    // mark all controls touched. This will add bottom margin class if a contorl is invalid
    // <mat-form-field [ngClass]=".."
    this.form?.markAllAsTouched();

    if (this.form?.valid && !this.isLoading) {
      this.isLoading = true;
      this.error = false;

      const user: User = {
        name: this.form.get(this.controlNames.name)?.value,
        password: this.form.get(this.controlNames.password)?.value,
        email: this.form.get(this.controlNames.email)?.value,
        bio: this.form.get(this.controlNames.bio)?.value,
      };

      this.store.dispatch(UserActions.createUser({ user }));
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe);
  }
}
