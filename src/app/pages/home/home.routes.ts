import { StudentFormComponent } from './student/student-form/student-form.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'student',		
		loadChildren:()=> import('./student/student.routes').then((r)=>r.routes)
	},
	
	{
		path: '',
		title: 'Home',
		loadComponent: () => import('./home.component').then((c) => c.HomeComponent),
		pathMatch: 'full'
	},
	{
		path:'course',
		loadChildren:()=>import('./course/course.routes').then((r)=>r.routes)
	}
];
