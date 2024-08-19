import { Component, inject, OnDestroy, OnInit } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { StudentResponseDto } from '../../../../core/dto/student/studentResponseDto';

@Component({
	selector: 'app-student-form',
	standalone: true,
	imports: [MatCardModule, MatFormFieldModule, ReactiveFormsModule, MatInput, MatButtonModule],
	templateUrl: './student-form.component.html',
	styleUrl: './student-form.component.scss'
})
export class StudentFormComponent extends AppBaseComponent implements OnInit, OnDestroy {
	private readonly studentService: StudentService = inject(StudentService);
	private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
	private readonly router: Router = inject(Router);

	form: FormGroup;
	sharedStudent: StudentResponseDto;

	constructor(private fb: FormBuilder) {
		super();
	}
	ngOnDestroy(): void {
		this.studentService.resetSharedStudent();
	}
	ngOnInit(): void {
		this.sharedStudent = this.activatedRoute.snapshot.data['sharedStudent'];
		this.form = this.fb.group({
			firstName: [this.sharedStudent ? this.sharedStudent.firstName : '', [CustomValidators.LetterValidator, Validators.minLength(3)]],
			lastName: [this.sharedStudent ? this.sharedStudent.lastName : '', [CustomValidators.LetterValidator, Validators.minLength(3)]],
			age: [this.sharedStudent ? this.sharedStudent.age : '', [CustomValidators.NumericValidator]],
			email: [this.sharedStudent ? this.sharedStudent.email : '', [CustomValidators.EmailValidator]],
			courseId: [this.sharedStudent ? this.sharedStudent.courseId : '1']
		});
	}

	public async save(): Promise<void> {
		if (this.form.valid) {
			let newStudent: StudentRequestDto = this.form.value;
			await lastValueFrom(this.studentService.save(newStudent)).then((response) => {
				alert(`Student with name ${response.firstName} has been created successfully\n`);
				this.router.navigate(['/student']);
			});
		}
	}

	public async update(): Promise<void> {
		if (this.form.valid) {
			let newStudent: StudentRequestDto = this.form.value;
			await lastValueFrom(this.studentService.update(newStudent)).then((response) => {
				alert(`Student with name ${response.firstName} has been updated successfully\n`);
				this.router.navigate(['/student']);
			});
		}
	}
	goBack() {
		history.back();
	}
}
