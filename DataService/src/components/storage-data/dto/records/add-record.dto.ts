import { IsInt, IsDefined } from 'class-validator';
import { BaseDto } from '@astra/common';

export class AddRecordDto extends BaseDto {

    @IsInt()
    storageId: number;

    @IsDefined()
    record: any;

}