import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CourseDto } from "../dto/course/courseDto";

const API_URL = `${environment.api_url}/course`;
@Injectable({
    providedIn:'root'
})
export class CourseService{
    private readonly http:HttpClient = inject(HttpClient);

    public getAll():Observable<CourseDto[]>{
        return this.http.get<CourseDto[]>(API_URL);
    }
}