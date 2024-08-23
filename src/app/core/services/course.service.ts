import { StudentResponseDto } from './../dto/student/studentResponseDto';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseDto } from '../dto/course/courseDto';
import { StudentByCourseResponse } from '../dto/student/studentByCourseResponse';

const API_URL = `${environment.api_url}/course`;
@Injectable({
	providedIn: 'root'
})
export class CourseService {
	private readonly http: HttpClient = inject(HttpClient);

	private sharedCourse: CourseDto;

	public getAll(): Observable<CourseDto[]> {
		return this.http.get<CourseDto[]>(API_URL);
	}

	public save(course: CourseDto): Observable<CourseDto> {
		return this.http.post<CourseDto>(API_URL, course);
	}

	public update(course: CourseDto): Observable<CourseDto> {
		return this.http.put<CourseDto>(API_URL, course);
	}

	public delete(id: number): Observable<boolean> {
		return this.http.delete<boolean>(`${API_URL}/${id}`);
	}

	public getCourseById(id: number): Observable<CourseDto> {
		return this.http.get<CourseDto>(`${API_URL}/search-by-id/${id}`);
	}

	public getStudentsByCourseId(id: number): Observable<StudentByCourseResponse> {
		return this.http.get<StudentByCourseResponse>(`${API_URL}/search-students/${id}`);
	}

	public setSharedCourse(course: CourseDto) {
		this.sharedCourse = course;
	}

	public getSharedCourse(): CourseDto {
		return this.sharedCourse;
	}

	public resetSharedCourse() {
		this.sharedCourse = null;
	}
}
