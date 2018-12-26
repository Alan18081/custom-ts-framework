import { IsInt } from 'class-validator';

export class FindStorageListDto {

  @IsInt()
  projectId: number;

}