import { IsInt, IsDefined, IsString } from 'class-validator';
import { BaseDto } from '@astra/common';

export class AddRecordDto extends BaseDto {

    @IsInt()
    projectId: number;

    @IsInt()
    storageId: number;

    @IsInt()
    userId: number;

    @IsString()
    path: string;

    @IsDefined()
    data: any;

}