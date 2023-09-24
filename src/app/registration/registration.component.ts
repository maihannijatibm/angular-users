import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { APP_CONSTANTS } from '../app.constants';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  form?: FormGroup;

  controlNames = {
    name: 'name',
    email: 'email',
    bio: 'bio',
  };

  controlMaxLengths = {
    name: 64,
    email: 64,
    bio: 256,
  };

  isLoading: boolean = false;

  error: boolean = false;

  subscriptions: Subscription[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
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
        email: this.form.get(this.controlNames.email)?.value,
        bio: this.form.get(this.controlNames.bio)?.value,
      };

      const subscription = this.userService.create(user).subscribe({
        next: (result) => this.successHandler(result),
        error: (error) => this.errorHandler(error),
        complete: () => (this.isLoading = false),
      });

      this.subscriptions.push(subscription);
    }
  }

  successHandler(result: { success: boolean }): void {
    if (result.success) {
      this.router.navigate([APP_CONSTANTS.ROUTES.profile]);
    }
  }

  errorHandler(error: any): void {
    this.error = true;
    console.log(error);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe);
  }
}
