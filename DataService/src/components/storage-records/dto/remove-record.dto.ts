import { IsInt, IsMongoId } from 'class-validator';
import { BaseDto } from '@astra/common';

export class RemoveRecordDto extends BaseDto {

    @IsInt()
    storageId: number;

    @IsMongoId()
    recordId: string;

}