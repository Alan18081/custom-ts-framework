import {IsEmail, IsString, MinLength} from 'class-validator';


export class CreateUserDto {

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(4)
    password: string;

    constructor(data: any) {
        Object.assign(this, data);
    }

}