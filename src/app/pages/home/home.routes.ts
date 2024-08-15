import { StudentFormComponent } from './student/student-form/student-form.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'student',
		title: 'Students',
		loadComponent: () => import('./student/student.component').then((c) => c.StudentComponent),
		pathMatch: 'full'
	},
	{
		path: 'student-form',
		title: 'Create student',
		loadComponent: () => import('./student/student-form/student-form.component').then((c) => c.StudentFormComponent),
		pathMatch: 'full'
	},
	{
		path: '',
		title: 'Home',
		loadComponent: () => import('./home.component').then((c) => c.HomeComponent),
		pathMatch: 'full'
	}
];
