import { Routes } from '@angular/router';
import { coursesResolver, sharedCoursesResolver } from '../../../core/resolvers/courseResolvers.resolver';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () => import('./course.component').then((c) => c.CourseComponent),
		title: 'Courses',
		resolve: { data: coursesResolver }
	},
	{
		path: 'form',
		loadComponent: () => import('./course-form/course-form.component').then((c) => c.CourseFormComponent),
		title: 'Courses',
		resolve: { sharedCourse: sharedCoursesResolver }
	},
	{
		path: 'detail',
		loadComponent: () => import('./course-detail/course-detail.component').then((c) => c.CourseDetailComponent),
		title: 'Course detail'
	}
];
