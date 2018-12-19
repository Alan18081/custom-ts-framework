import { IsEmail, IsString, MinLength } from 'class-validator';
import { PASSWORD_LENGTH } from '../../../config/common';

export class LoginDto {

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(PASSWORD_LENGTH)
  password: string;

}