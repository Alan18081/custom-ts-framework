import { IsInt, IsJSON } from 'class-validator';
import { BaseDto } from '@astra/common';

export class UpdateStorageDataDto extends BaseDto {

  @IsInt()
  id: number;

  @IsJSON()
  data: string;

}