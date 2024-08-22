import { ResolveFn } from '@angular/router';
import { CourseDto } from '../dto/course/courseDto';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { CourseService } from '../services/course.service';

export const coursesResolver: ResolveFn<Observable<CourseDto[]>> = (route, state) => {
	const courseService = inject(CourseService);
	return courseService.getAll();
};

export const sharedCoursesResolver: ResolveFn<CourseDto> = (route, state) => {
	const courseService = inject(CourseService);
	return courseService.getSharedCourse();
};
