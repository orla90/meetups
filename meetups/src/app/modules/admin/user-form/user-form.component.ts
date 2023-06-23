import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
  });
  submitted = false;
  loading = false;
  userError?: string;
  
  
  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    this.userError = '';
  }

  get email() {
    return this.userForm.get('email');
  }
  get password() {
    return this.userForm.get('password');
  }
  get role() {
    return this.userForm.get('role');
  }
  
  submitApplication() {
    this.submitted = true;
    
    if (this.userForm.invalid) return;
    
    this.loading = true;

  }
}
