import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
import { AuthClaimsDto } from '../dto/auth/authClaimsDto';
import * as jwtDecode from 'jwt-decode';

@Injectable({
	providedIn: 'root'
})
export class TokenService {
	constructor() {}

	getToken(): string {
		return getCookie('token');
	}

	existsToken(): boolean {
		return getCookie('token') != null;
	}

	public saveToken(jwtToken: string): void {
		setCookie('token', jwtToken, {
			expires: 1,
			path: '/'
		});
	}
	public isExpired(): boolean {
		if (!this.existsToken) {
			return true;
		}
		const decoded_token = jwtDecode.jwtDecode(this.getToken());
		const expiration_date = decoded_token.exp * 1000; //convertir segundos a milisegundos
		if (expiration_date < Date.now()) {
			return true;
		} else {
			return false;
		}
	}

	public deleteToken(): void {
		removeCookie('token');
	}

	public getInfoToken(): AuthClaimsDto {
		return <AuthClaimsDto>jwtDecode.jwtDecode(this.getToken());
	}
}
