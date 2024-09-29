import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AppBaseComponent } from '../../../../core/util/appBaseComponent';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { crossPasswordValidator, CustomValidators, PasswordStateMatcher } from '../../../../core/util/customValidator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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

	public async register(): Promise<void> {}
}
