import { IsMongoId } from 'class-validator';

export class GetRecordDto {

  @IsMongoId()
  id: string;

}