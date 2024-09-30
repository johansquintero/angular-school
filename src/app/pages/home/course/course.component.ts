import { Component, inject, OnInit } from '@angular/core';
import { CourseService } from '../../../core/services/course.service';
import { CourseDto } from '../../../core/dto/course/courseDto';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { SearchComponent } from '../../../components/search/search.component';
import { TokenService } from '../../../core/services/token.service';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-course',
	standalone: true,
	imports: [MatCardModule, MatTableModule, MatButtonModule, RouterLink, SearchComponent, CommonModule],
	templateUrl: './course.component.html',
	styleUrl: './course.component.scss'
})
export class CourseComponent implements OnInit {
	private readonly courseService: CourseService = inject(CourseService);
	private readonly ar: ActivatedRoute = inject(ActivatedRoute);
	private readonly router: Router = inject(Router);
	private readonly tokenService: TokenService = inject(TokenService);

	public authorities: string[];
	public courses: CourseDto[];
	displayedColumns: String[] = ['id', 'name', 'teacher', 'delete', 'update'];
	ngOnInit(): void {
		this.courses = this.ar.snapshot.data['data'];
		this.authorities = this.tokenService.getAuthorities();
		this.evaluateDisplayedConlumns();
	}

	public async getAll(): Promise<void> {
		await lastValueFrom(this.courseService.getAll()).then((value) => {
			this.courses = value;
		});
	}

	public async delete(course: CourseDto): Promise<void> {
		await lastValueFrom(this.courseService.delete(course.id)).then((value) => {
			if (value) {
				this.courses = this.courses.filter((c) => c.id != course.id);
				alert(`Course with name ${course.name} deleted successfully`);
			}
		});
	}

	public goDetail(id: number): void {
		this.router.navigate(['/course/detail'], {
			queryParams: { id: id }
		});
	}

	public goUpdate(course: CourseDto) {
		this.courseService.setSharedCourse(course);
		this.router.navigate(['/course/form']);
	}

	public async search(value: string): Promise<void> {
		if (value.length > 0) {
			await lastValueFrom(this.courseService.getCoursesByValues(value)).then((response) => {
				this.courses = response;
			});
		} else {
			this.ngOnInit();
		}
	}
	public finAuthority(value: string): boolean {
		let p = this.authorities.find((s: string) => s == value);
		return p != undefined;
	}

	public evaluateDisplayedConlumns(): void {
		if (this.finAuthority('DELETE') == false) {
			this.displayedColumns = this.displayedColumns.filter((s) => s != 'delete');
		}
		if (this.finAuthority('UPDATE') == false) {
			this.displayedColumns = this.displayedColumns.filter((s) => s != 'update');
		}
	}
}
