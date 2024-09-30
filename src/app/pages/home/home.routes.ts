import { authGuard } from '../../core/guards/auth.guard';
import { inverseAuthGuard } from '../../core/guards/inverse-auth.guard';
import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'student',
		loadChildren: () => import('./student/student.routes').then((r) => r.routes),
		canActivate: [authGuard]
	},
	{
		path: '',
		title: 'Home',
		loadComponent: () => import('./home.component').then((c) => c.HomeComponent),
		pathMatch: 'full',
		canActivate: [authGuard]
	},
	{
		path: 'course',
		loadChildren: () => import('./course/course.routes').then((r) => r.routes),
		canActivate: [authGuard]
	},

	{
		path: 'authentication',
		title: 'Login',
		loadChildren: () => import('./auth/auth.routes').then((r) => r.routes),
		canActivate: [inverseAuthGuard]
	}
];
