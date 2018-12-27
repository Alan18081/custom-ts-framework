import {IsEmail, IsString, MinLength} from 'class-validator';
import {config, BaseDto} from '@astra/common';

export class LoginDto extends BaseDto {

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(config.common.passwordLength)
    password: string;

}