import { IsInt } from 'class-validator';
import { PaginationDto } from '@astra/common';

export class FindStorageListDto extends PaginationDto {

  @IsInt()
  userId: number;

  @IsInt()
  projectId: number;

}