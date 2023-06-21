import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  submitted = false;
  loading = false;
  loginError?: string;
  
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
  ) {
    if (this.authService.user) {
      this.router.navigate(['/meetups']);
    }
    this.loginError = '';
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  
  submitApplication() {
    this.submitted = true;
    
    if (this.loginForm.invalid) return;
    
    this.loading = true;
    this.authService.login(this.email!.value, this.password!.value).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/todos';
        this.router.navigateByUrl(returnUrl);
      },
      error: error => {
        this.loginError = error.error[0] || 'Incorrect username/password';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
