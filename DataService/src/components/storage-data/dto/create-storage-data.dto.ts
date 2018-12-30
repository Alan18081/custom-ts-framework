import { IsInt } from 'class-validator';
import { BaseDto } from '@astra/common';

export class CreateStorageDataDto extends BaseDto {

    @IsInt()
    storageId: number;

    @IsInt()
    projectId: number;

    @IsInt()
    userId: number;

}