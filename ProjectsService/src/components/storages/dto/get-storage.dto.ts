import { IsInt } from 'class-validator';

export class GetStorageDto {

  @IsInt()
  id: number;

}