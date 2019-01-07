import { IsEmail, IsString } from 'class-validator';
import { BaseDto } from '@astra/common';

export class LoginProjectAccountDto extends BaseDto {

    @IsEmail()
    email: string;

    @IsString()
    password: string;

}