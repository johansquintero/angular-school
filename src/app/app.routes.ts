import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { inverseAuthGuard } from './core/guards/inverse-auth.guard';

export const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./pages/home/home.routes').then((r) => r.routes),
		canActivate: [authGuard]
	},
	{
		path: 'login',
		title: 'Login',
		loadComponent: () => import('./pages/login/login.component').then((c) => c.LoginComponent),
		canActivate:[inverseAuthGuard]
	},

	{
		path: '**',
		redirectTo: '/',
		pathMatch: 'full'
	}
];
