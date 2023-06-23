import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/classes/role';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-user-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() public user: User | null = null;
  roles = ['user', 'admin'];
  submitted = false;
  loading = false;
  userError?: string;
  selectedRole:string = '';
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
  });
  
  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
  }
  
  ngOnInit() {
    if (this.user) {
      this.userForm.setValue({
        email: this.user.email,
        password: this.user.password,
        role: this.user.roles[0].name.toLowerCase(),
      })
      this.selectedRole = this.user.roles[0].name.toLowerCase();
    }
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
