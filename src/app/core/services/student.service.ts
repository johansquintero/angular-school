import { StudentResponseDto } from './../dto/student/studentResponseDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StudentRequestDto } from '../dto/student/studentRequestDto';

const API_URL = `${environment.api_url}/student`;
@Injectable({
	providedIn: 'root'
})
export class StudentService {
	private sharedStudent: StudentResponseDto;

	constructor(private http: HttpClient) {}

	public getAll(): Observable<StudentResponseDto[]> {
		return this.http.get<StudentResponseDto[]>(API_URL);
	}

	public save(studentRequest: StudentRequestDto): Observable<StudentResponseDto> {
		return this.http.post<StudentResponseDto>(API_URL, studentRequest);
	}

	public searchByAttributes(value: string): Observable<StudentResponseDto[]> {
		return this.http.get<StudentResponseDto[]>(`${API_URL}/search-by-attributes/${value}`);
	}

	public searchById(id: number): Observable<StudentResponseDto> {
		return this.http.get<StudentResponseDto>(`${API_URL}/search-by-id/${id}`);
	}

	public update(student: StudentRequestDto): Observable<StudentResponseDto> {
		return this.http.put<StudentResponseDto>(API_URL, student);
	}

	public delete(id: number): Observable<boolean> {
		return this.http.delete<boolean>(`${API_URL}/${id}`);
	}

	public setSharedStudent(student: StudentResponseDto): void {
		this.sharedStudent = student;
	}
	public getSharedStudent(): StudentResponseDto {
		return this.sharedStudent;
	}
	public resetSharedStudent(): void {
		this.sharedStudent = null;
	}
}
