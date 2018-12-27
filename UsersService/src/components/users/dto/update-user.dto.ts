import {IsEmail, IsString, IsInt, IsOptional} from 'class-validator';
import {BaseDto} from '@astra/common';


export class UpdateUserDto extends BaseDto {

    @IsInt()
    id: number;

    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;

    @IsEmail()
    @IsOptional()
    email: string;

}