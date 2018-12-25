import { IsEmail } from 'class-validator';
import {PASSWORD_LENGTH} from '../../../config/common';
import { BaseDto } from '../../../../../Common/src/dto/base.dto';

export class LoginDto extends BaseDto {

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(PASSWORD_LENGTH)
    password: string;

}