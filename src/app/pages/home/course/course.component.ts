import { Component, inject, OnInit } from '@angular/core';
import { CourseService } from '../../../core/services/course.service';
import { CourseDto } from '../../../core/dto/course/courseDto';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { lastValueFrom } from 'rxjs';

@Component({
	selector: 'app-course',
	standalone: true,
	imports: [MatCardModule, MatTableModule],
	templateUrl: './course.component.html',
	styleUrl: './course.component.scss'
})
export class CourseComponent implements OnInit {
	private readonly courseService: CourseService = inject(CourseService);

	public courses: CourseDto[];
	displayedColumns: String[] = ['id', 'name', 'teacher'];
	ngOnInit(): void {
		this.getAll();
	}

	public async getAll(): Promise<void> {
		await lastValueFrom(this.courseService.getAll()).then((value) => {
			this.courses = value;
		});
	}
}
