import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;
  @IsString()
  name: string;
  @IsStrongPassword()
  password: string;
}

export default RegisterDto;
