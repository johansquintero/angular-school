import { StudentResponseDto } from './studentResponseDto';

export interface StudentByCourseResponse {
	name: string;
	teacher: string;
	students: StudentResponseDto[];
}
