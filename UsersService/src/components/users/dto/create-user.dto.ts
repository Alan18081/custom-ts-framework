import {IsEmail, IsString, MinLength} from 'class-validator';
import {BaseDto, config} from '@astra/common';


export class CreateUserDto extends BaseDto {

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(config.common.passwordLength)
    password: string;

}