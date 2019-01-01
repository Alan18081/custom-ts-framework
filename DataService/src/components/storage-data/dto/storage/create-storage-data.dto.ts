import { IsInt, IsString } from 'class-validator';
import { BaseDto } from '@astra/common';

export class CreateStorageDataDto extends BaseDto {

    @IsInt()
    storageId: number;

    @IsInt()
    projectId: number;

    @IsString()
    path: string;

    @IsInt()
    userId: number;

}