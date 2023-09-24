import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
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

  constructor(private readonly formBuilder: FormBuilder) {}

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
}
