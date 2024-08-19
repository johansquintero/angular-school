import { MatCardModule } from '@angular/material/card';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { StudentService } from '../../../../core/services/student.service';
import { StudentResponseDto } from '../../../../core/dto/student/studentResponseDto';
import { lastValueFrom } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'app-student-detail',
	standalone: true,
	imports: [MatCardModule, MatListModule, MatButtonModule],
	templateUrl: './student-detail.component.html',
	styleUrl: './student-detail.component.scss'
})
export class StudentDetailComponent implements OnInit {
	private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
	private readonly studentService: StudentService = inject(StudentService);

	public student: StudentResponseDto;

	ngOnInit(): void {
		this.getCompra();
	}

	public async getCompra(): Promise<void> {
		let studentId: number;
		this.activatedRoute.queryParams.subscribe((param: Params) => {
			studentId = param['id'];
		});
		if (studentId) {
			await lastValueFrom(this.studentService.searchById(studentId))
				.then((response) => {
					this.student = response;
				})
				.catch(() => {
					alert('Error: El usuario no existe');
					this.goBack();
				});
		} else {
			alert('Error: El usuario no existe');
			this.goBack();
		}
	}

	public goBack() {
		history.back();
	}
}
