import { StudenResponseDto } from './../dto/student/studentResponseDto';
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

  constructor(private http:HttpClient) {}

  public getAll():Observable<StudenResponseDto[]>{
    return this.http.get<StudenResponseDto[]>(API_URL);
  }

  public save(studentRequest:StudentRequestDto):Observable<StudenResponseDto>{
    return this.http.post<StudenResponseDto>(API_URL,studentRequest);
  }
}
