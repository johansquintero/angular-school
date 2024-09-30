import { StudentService } from '../../../core/services/student.service';
import { Component, inject, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { lastValueFrom } from 'rxjs';
import { StudentResponseDto } from '../../../core/dto/student/studentResponseDto';
import { SearchComponent } from '../../../components/search/search.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TokenService } from '../../../core/services/token.service';

@Component({
	selector: 'app-studen',
	standalone: true,
	imports: [MatListModule, MatTableModule, SearchComponent, MatButtonModule, RouterLink],
	templateUrl: './student.component.html',
	styleUrl: './student.component.scss'
})
export class StudentComponent implements OnInit {
	private readonly tokenService: TokenService = inject(TokenService);

	public authorities: string[];

	public displayedColumns = ['id', 'firstName', 'lastName', 'age', 'email', 'delete', 'update']
	public students: StudentResponseDto[];
	constructor(private studentService: StudentService, private activatedRoute: ActivatedRoute, private router: Router) {}
	ngOnInit(): void {
		this.students = this.activatedRoute.snapshot.data['data'];
		this.authorities = this.tokenService.getAuthorities();
		this.evaluateDisplayedConlumns();
	}

	public async getAll(): Promise<void> {
		await lastValueFrom(this.studentService.getAll()).then((value: StudentResponseDto[]) => {
			this.students = value;
		});
	}
	public async search(value: string): Promise<void> {
		if (value.length > 0) {
			await lastValueFrom(this.studentService.searchByAttributes(value)).then((value) => {
				this.students = value;
			});
		} else {
			this.getAll();
		}
	}

	public goUpdate(student: StudentResponseDto): void {
		this.studentService.setSharedStudent(student);
		this.router.navigateByUrl('/student/form');
	}

	public goDetail(id: number) {
		this.router.navigate(['/student/detail'], {
			queryParams: { id: id }
		});
	}

	public async delete(id: number): Promise<void> {
		await lastValueFrom(this.studentService.delete(id)).then((value) => {
			if (value) {
				alert('Estudiante eliminado satisfactoriamente');
				this.students = this.students.filter((student) => student.id != id);
			}
		});
	}

	public finAuthority(value: string): boolean {
		let p = this.authorities.find((s: string) => s == value);		
		return p != undefined;
	}

	public evaluateDisplayedConlumns():void{
		if (this.finAuthority('DELETE')==false) {
			 this.displayedColumns = this.displayedColumns.filter((s)=>s!='delete');
		}
		if (this.finAuthority('UPDATE')==false) {
			this.displayedColumns = this.displayedColumns.filter((s) => s != 'update');
		}
	}
}
