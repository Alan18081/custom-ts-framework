import { IsInt, IsArray, IsDefined } from 'class-validator';
import { BaseDto } from '@astra/common';

export class UpdateRecordDto extends BaseDto {

    @IsInt()
    storageId: number;

    @IsArray()
    path: string[];

    @IsDefined()
    record: any;


}