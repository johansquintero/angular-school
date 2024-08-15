import { StudentService } from '../../../core/services/student.service';
import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { lastValueFrom } from 'rxjs';
import { StudenResponseDto } from '../../../core/dto/student/studentResponseDto';

@Component({
	selector: 'app-studen',
	standalone: true,
	imports: [MatListModule, MatTableModule],
	templateUrl: './student.component.html',
	styleUrl: './student.component.scss'
})
export class StudentComponent implements OnInit{
	displayedColumns: String[] = ['id','firstName', 'lastName', 'age', 'email'];
	public students: StudenResponseDto[];
	constructor(private studentService: StudentService) {}
	ngOnInit(): void {
		this.getAll();
	}

	public async getAll(): Promise<void> {
		await lastValueFrom(this.studentService.getAll()).then((value: StudenResponseDto[]) => {
			this.students = value;
		});
	}
}
