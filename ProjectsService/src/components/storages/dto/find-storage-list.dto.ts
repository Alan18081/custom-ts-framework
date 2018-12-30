import { IsInt } from 'class-validator';
import { BaseDto } from '@astra/common';

export class FindStorageListDto extends BaseDto {

  @IsInt()
  projectId: number;

}