import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject} from '@angular/core';
import { TokenService } from '../services/token.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	const tokenService = inject(TokenService);
	let token = tokenService.getToken();

	if (!token) {
		return next(req);
	}
	let headers = {
		Authorization: 'Bearer ' + token
	};
	let authRequest = req.clone({
		setHeaders: {
			...headers
		}
	});

	return next(authRequest).pipe(
		catchError((err: HttpErrorResponse) => {
      if (err.status==403) {
        alert('No tienes permiso necesarios para acceder a esta pagina, se requiere iniciar sesion o tener una jerarquia mayor');
      }
			return throwError(() => err);
		})
	);
};
