import { IsEmail } from 'class-validator';
import { BaseDto } from '@astra/common';

export class FindUserByEmailDto extends BaseDto {

  @IsEmail()
  email: string;

}