import { AuthResponseDto } from '../dto/auth/authResponseDto';
import { AuthRequestDto } from '../dto/auth/authRequestDto';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthRequestSignUpDto } from '../dto/auth/authRequestSignUpDto';

const API_URL = `${environment.api_url}/auth`;

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(private http: HttpClient, private tokenService: TokenService) {}

	public logIn(authRequest: AuthRequestDto): Observable<AuthResponseDto> {
		return this.http.post<AuthResponseDto>(`${API_URL}/log-in`, authRequest).pipe(
			tap((response: AuthResponseDto) => {
				if (response.status) {
					this.tokenService.saveToken(response.jwt);
				}
			})
		);
	}
	public logOut(): void {
		this.tokenService.deleteToken();
	}

	public signUp(authRequestSignUpDto: AuthRequestSignUpDto): Observable<AuthResponseDto> {
		return this.http.post<AuthResponseDto>(`${API_URL}/sign-up`, authRequestSignUpDto).pipe(
			tap((response:AuthResponseDto)=>{
				if (response.status) {
					this.tokenService.saveToken(response.jwt);					
				}
			})
		);
	}
}
