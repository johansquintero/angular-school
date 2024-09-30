import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = (route, state) => {
	const tokenService = inject(TokenService);
	const router = inject(Router);
	if (!tokenService.existsToken() || tokenService.isExpired()) {
		alert('No estas autorizado para acceder a la siguiente pagina, por favor inicia sesion....');
		router.navigate(['authentication']);
		return false;
	}

	return true;
};
