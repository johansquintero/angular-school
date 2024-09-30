import { Routes } from '@angular/router';
import { sharedStudentsResolver, studentsResolver } from '../../../core/resolvers/studentResolvers.resolver';
import { createAndUpdatePersmissionGuard } from '../../../core/guards/persmission.guard';

export const routes: Routes = [
	{
		path: '',
		title: 'Students',
		loadComponent: () => import('./student.component').then((c) => c.StudentComponent),
		pathMatch: 'full',
		resolve: { data: studentsResolver }
	},
	{
		path: 'form',
		title: 'Create student',
		loadComponent: () => import('./student-form/student-form.component').then((c) => c.StudentFormComponent),
		pathMatch: 'full',
		resolve: {
			sharedStudent: sharedStudentsResolver
		},
		canActivate: [createAndUpdatePersmissionGuard]
	},
	{
		path: 'detail',
		title: 'Student detail',
		loadComponent: () => import('./student-detail/student-detail.component').then((c) => c.StudentDetailComponent)
	}
];
