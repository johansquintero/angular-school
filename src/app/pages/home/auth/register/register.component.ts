import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AppBaseComponent } from '../../../../core/util/appBaseComponent';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { crossPasswordValidator, CustomValidators, PasswordStateMatcher } from '../../../../core/util/customValidator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../../core/services/auth.service';
import { AuthRequestSignUpDto } from '../../../../core/dto/auth/authRequestSignUpDto';
import { lastValueFrom } from 'rxjs';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, RouterLink],
	templateUrl: './register.component.html',
	styleUrl: './register.component.scss'
})
export class RegisterComponent extends AppBaseComponent implements OnInit {
	public formGroup: FormGroup;
	passwordStateMatcher = new PasswordStateMatcher();

	private readonly authService: AuthService = inject(AuthService);
	private readonly router: Router = inject(Router);

	constructor(private fb: FormBuilder) {
		super();
	}
	ngOnInit(): void {
		this.formGroup = this.fb.group(
			{
				username: ['', [Validators.required, Validators.minLength(3)]],
				password: ['', [Validators.required, Validators.minLength(5)]],
				repeatPassword: ['', Validators.required]
			},
			{ validator: crossPasswordValidator }
		);
	}

	public async register(): Promise<void> {
		if (this.formGroup.valid) {
			let request: AuthRequestSignUpDto;
			request = {
				username: this.formGroup.controls['username'].value,
				password: this.formGroup.controls['password'].value,
				authRolesRequestDto: {
					rolesListName: ['INVITED', 'USER']
				}
			};
			await lastValueFrom(this.authService.signUp(request)).then((response) => {
				alert("Your registration was sucessfully completed...")
				this.router.navigate(['/']);
			});
		}
	}
}
