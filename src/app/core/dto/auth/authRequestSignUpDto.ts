import { AuthRolesRequestDto } from "./authRolesRequestDto";

export interface AuthRequestSignUpDto {
	username: string;
	password: string;
	authRolesRequestDto: AuthRolesRequestDto;
}