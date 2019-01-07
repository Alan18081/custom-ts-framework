import { IsMongoId } from 'class-validator';
import { BaseDto } from '@astra/common';

export class FindRecordDto extends BaseDto {

  @IsMongoId()
  id: string;

}