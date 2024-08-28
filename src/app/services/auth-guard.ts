import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard = (roles: string[]) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const userRole = authService.getRole();
  if (userRole && authService.isAuthenticated() && roles.includes(userRole)) {
    return true;
  }
  return router.navigate(['/unauthorized']);
};
