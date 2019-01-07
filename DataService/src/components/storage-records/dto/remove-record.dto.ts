import { IsMongoId } from 'class-validator';
import { BaseDto } from '@astra/common';

export class RemoveRecordDto extends BaseDto {

    @IsMongoId()
    id: string;

}