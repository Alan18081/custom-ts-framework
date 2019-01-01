import { IsString } from 'class-validator';
import { BaseDto } from '@astra/common';

export class LoginProjectDto extends BaseDto {

    @IsString()
    clientId: string;

    @IsString()
    clientSecret: string;

}