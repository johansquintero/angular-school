import { StudentResponseDto } from './../../../../core/dto/student/studentResponseDto';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { CourseDto } from '../../../../core/dto/course/courseDto';
import { lastValueFrom } from 'rxjs';
import { CourseService } from '../../../../core/services/course.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'app-course-detail',
	standalone: true,
	imports: [MatCardModule, MatListModule, MatButtonModule],
	templateUrl: './course-detail.component.html',
	styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent implements OnInit {
	private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
	private readonly courseService: CourseService = inject(CourseService);

	public students: StudentResponseDto[];
	public course: CourseDto;
	ngOnInit(): void {
		this.getCourse();
		console.log(this.course);
	}
	public async getCourse(): Promise<void> {
		let id: number;
		this.activatedRoute.queryParams.subscribe((param: Params) => {
			id = param['id'];
		});
		if (id) {
			await lastValueFrom(this.courseService.getCourseById(id)).then((response) => {
				this.course = response;
			});
			await lastValueFrom(this.courseService.getStudentsByCourseId(id)).then((response) => {
				this.students = response;
			});
		}
	}

	goBack() {
		history.back();
	}
}
