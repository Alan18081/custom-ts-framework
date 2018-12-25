import { IsEmail } from 'class-validator';
import { BaseDto } from '@astra/common';

export class FindUserByEmail extends BaseDto {

  @IsEmail()
  email: string;

}