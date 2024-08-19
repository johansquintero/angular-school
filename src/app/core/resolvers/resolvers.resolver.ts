import { ResolveFn } from '@angular/router';
import { StudentService } from '../services/student.service';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentResponseDto } from '../dto/student/studentResponseDto';

export const studentsResolver: ResolveFn<Observable<StudentResponseDto[]>> = (route, state) => {
	const studentService = inject(StudentService);
	return studentService.getAll();
};

export const sharedStudentsResolver: ResolveFn<StudentResponseDto> = (route, state) => {
	const studentService = inject(StudentService);
	return studentService.getSharedStudent();
};