import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppBaseComponent } from '../../../../core/util/appBaseComponent';
import { CustomValidators } from '../../../../core/util/customValidator';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { lastValueFrom } from 'rxjs';
import { StudentRequestDto } from '../../../../core/dto/student/studentRequestDto';
import { StudentService } from '../../../../core/services/student.service';

@Component({
	selector: 'app-student-form',
	standalone: true,
	imports: [MatCardModule, MatFormFieldModule, ReactiveFormsModule, MatInput, MatButtonModule],
	templateUrl: './student-form.component.html',
	styleUrl: './student-form.component.scss'
})
export class StudentFormComponent extends AppBaseComponent {
	private readonly studentService: StudentService = inject(StudentService);
	form: FormGroup;
	constructor(private fb: FormBuilder) {
		super();
		this.form = this.fb.group({
			firstName: ['', [CustomValidators.LetterValidator, Validators.minLength(3)]],
			lastName: ['', [CustomValidators.LetterValidator, Validators.minLength(3)]],
			age: ['', [CustomValidators.NumericValidator]],
			email: ['', [CustomValidators.EmailValidator]],
			courseId:['1']
		});
	}

	public async save(): Promise<void> {
		if (this.form.valid) {
			let newStudent: StudentRequestDto = this.form.value;
			await lastValueFrom(this.studentService.save(newStudent)).then((response) => {
				alert(`Student with name ${response.firstName} has been created successfully\n`);
			});
		}
	}
	goBack() {
		throw new Error('Method not implemented.');
	}
}
