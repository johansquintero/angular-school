import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const inverseAuthGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  if (tokenService.existsToken() && !tokenService.isExpired()) {
    alert("Ya tienes una sesion valida iniciada...");
    router.navigate(['/']);
    return false;
  }
  tokenService.deleteToken();
  return true;
};
