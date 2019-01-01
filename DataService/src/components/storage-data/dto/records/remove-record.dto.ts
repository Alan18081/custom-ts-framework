import { IsInt, IsArray } from 'class-validator';
import { BaseDto } from '@astra/common';

export class RemoveRecordDto extends BaseDto {

    @IsInt()
    storageId: number;

    @IsArray()
    path: string[];

}