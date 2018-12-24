import { IsEmail } from 'class-validator';
import { BaseDto } from '../../../../../Common/dto/base.dto';

export class FindUserByEmail extends BaseDto {

  @IsEmail()
  email: string;

}