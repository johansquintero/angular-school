import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CourseService } from '../../../../core/services/course.service';
import { AppBaseComponent } from '../../../../core/util/appBaseComponent';
import { CustomValidators } from '../../../../core/util/customValidator';
import { MatCardModule } from '@angular/material/card';
import { CourseDto } from '../../../../core/dto/course/courseDto';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-course-form',
	standalone: true,
	imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatCardModule],
	templateUrl: './course-form.component.html',
	styleUrl: './course-form.component.scss'
})
export class CourseFormComponent extends AppBaseComponent implements OnInit, OnDestroy {
	private readonly courseService: CourseService = inject(CourseService);
	private readonly fb: FormBuilder = inject(FormBuilder);
	private readonly router: Router = inject(Router);
	private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);

	public form: FormGroup;
	public sharedCourse: CourseDto;
	constructor() {
		super();
	}
	ngOnDestroy(): void {
		this.courseService.resetSharedCourse();
	}
	ngOnInit(): void {
		this.sharedCourse = this.activatedRoute.snapshot.data['sharedCourse'];
		this.form = this.fb.group({
			name: [this.sharedCourse ? this.sharedCourse.name : '', [CustomValidators.LetterAndNumericValidator, Validators.minLength(3)]],
			teacher: [this.sharedCourse ? this.sharedCourse.teacher : '', [CustomValidators.LetterValidator, Validators.minLength(3)]]
		});
	}

	public async save(): Promise<void> {
		if (this.form.valid) {
			let course: CourseDto = this.form.value as CourseDto;
			await lastValueFrom(this.courseService.save(course)).then((response) => {
				alert(`Student with name ${response.name} has been created successfully\n`);
				this.router.navigate(['/course']);
			});
		}
	}

	public async update(): Promise<void> {
		if (this.form.valid && this.sharedCourse) {
			let course: CourseDto = { ...this.form.value };
			course.id = this.sharedCourse.id;
			await lastValueFrom(this.courseService.update(course)).then((response) => {
				alert(`Student with name ${response.name} has been updated successfully\n`);
				this.router.navigate(['/course']);
			});
		}
	}
	goBack() {
		history.back();
	}
}
