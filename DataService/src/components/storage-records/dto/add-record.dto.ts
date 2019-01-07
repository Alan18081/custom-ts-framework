import { IsInt, IsDefined, IsString, IsOptional } from 'class-validator';
import { BaseDto } from '@astra/common';

export class AddRecordDto extends BaseDto {

    @IsInt()
    projectId: number;

    @IsInt()
    storageId: number;

    @IsString()
    path: string;

    @IsDefined()
    data: any;

    @IsInt()
    @IsOptional()
    accountId: number;

}