import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { inject } from '@angular/core';

export const createAndUpdatePersmissionGuard: CanActivateFn = (route, state) => {
  const tokenService:TokenService = inject(TokenService);
  const router = inject(Router);

  let authorities:string[] = tokenService.getAuthorities();
  let p: boolean = authorities.find((s: string) => s == 'CREATE') != undefined && authorities.find((s: string) => s == 'UPDATE') != undefined;

  if (!p) {
    alert("No tienes los privilegios de creacion o actualizacion...");
    router.navigate(['/']);
    return false;
  }
  return true;
};
