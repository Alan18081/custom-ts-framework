import { IsInt } from 'class-validator';

export class FindStorageDto {

  @IsInt()
  id: number;

}