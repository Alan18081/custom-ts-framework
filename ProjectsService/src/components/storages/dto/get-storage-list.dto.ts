import { IsInt } from 'class-validator';

export class GetStorageListDto {

  @IsInt()
  projectId: number;

}