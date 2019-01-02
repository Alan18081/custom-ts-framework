import { IsInt } from 'class-validator';
import { BaseDto } from '@astra/common';

export class FindRecordsListDto extends BaseDto {

    @IsInt()
    storageId: number;

}