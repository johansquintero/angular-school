import { ActivatedRoute, Params } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { lastValueFrom } from 'rxjs';
import { CourseService } from '../../../../core/services/course.service';
import { MatButtonModule } from '@angular/material/button';
import { StudentByCourseResponse } from '../../../../core/dto/student/studentByCourseResponse';

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

	public courseStudents: StudentByCourseResponse;
	ngOnInit(): void {
		this.getCourse();
	}
	public getCourse(): void {
		this.activatedRoute.queryParams.subscribe((param: Params) => {
			const id = param['id'];
			if (id) {
				this.courseService.getStudentsByCourseId(id).subscribe((response) => {
					this.courseStudents = response as StudentByCourseResponse;
					console.log(this.courseStudents);
				});
			}
		});
	}

	goBack() {
		history.back();
	}
}
