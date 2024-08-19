import {Routes } from "@angular/router";

export const routes:Routes = [
    {
        path:'',
        loadComponent:()=> import('./course.component').then((c)=>c.CourseComponent),
        title:'Courses'
    }
]