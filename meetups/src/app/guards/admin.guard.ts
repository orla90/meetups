import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state): any => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (
    authService.user &&
    authService.user.roles[0].name.toLowerCase() === 'admin'
  ) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
