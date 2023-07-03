import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state): any => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.user) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
