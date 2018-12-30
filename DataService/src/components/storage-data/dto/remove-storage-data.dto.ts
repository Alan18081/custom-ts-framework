import { BaseDto } from '@astra/common';
import { IsInt } from 'class-validator';

export class RemoveStorageDataDto extends BaseDto {

    @IsInt()
    storageId: number;

}