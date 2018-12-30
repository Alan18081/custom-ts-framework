import { IsInt } from 'class-validator';
import { BaseDto } from '@astra/common';

export class FindStorageDto extends BaseDto {

  @IsInt()
  id: number;

}