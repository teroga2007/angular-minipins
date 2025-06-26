import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = () => {
  const isLoggedIn =
    localStorage.getItem('user') === '{"username":"admin","password":"1234"}';
  const router = inject(Router);

  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
