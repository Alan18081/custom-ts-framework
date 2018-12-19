import {IsString, IsEmail, MinLength, IsInt} from 'class-validator';
import {PASSWORD_LENGTH} from "../../../config/common";

export class CreateUserDto {

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsEmail()
    email: string;

    @IsInt()
    age: number;

    @IsString()
    @MinLength(PASSWORD_LENGTH)
    password: string;

}