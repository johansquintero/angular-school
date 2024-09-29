import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { AuthRequestDto } from '../../../../core/dto/auth/authRequestDto';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, RouterLink],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
	logForm: FormGroup;

	constructor(private fb: FormBuilder, private authService: AuthService,private router:Router) {}
	ngOnInit(): void {
		this.logForm = this.fb.group({
			username: ['', [Validators.required, Validators.minLength(5)]],
			password: ['', [Validators.required, Validators.minLength(5)]]
		});
	}

	public async logIn(): Promise<void> {
		if (this.logForm.valid) {
			let username = this.logForm.get('username').value;
			let password = this.logForm.get('password').value;
			let authRequest: AuthRequestDto = { username, password };
			await lastValueFrom(this.authService.logIn(authRequest)).then((value) => {
				this.router.navigate(['/'])
			});
		}
	}
}
