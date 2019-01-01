import { IsInt, IsDefined, IsString } from 'class-validator';
import { BaseDto } from '@astra/common';

export class AddRecordDto extends BaseDto {

    @IsInt()
    projectId: number;

    @IsString()
    path: string;

    @IsDefined()
    record: any;

}