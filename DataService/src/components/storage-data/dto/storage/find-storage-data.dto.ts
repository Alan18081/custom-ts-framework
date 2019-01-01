import { BaseDto } from '@astra/common';
import { IsInt } from 'class-validator';

export class FindStorageDataDto extends BaseDto {

    @IsInt()
    storageId: number;

}