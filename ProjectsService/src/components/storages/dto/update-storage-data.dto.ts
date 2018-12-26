import { IsInt, IsJSON } from 'class-validator';

export class UpdateStorageDataDto {

  @IsInt()
  id: number;

  @IsJSON()
  data: string;

}