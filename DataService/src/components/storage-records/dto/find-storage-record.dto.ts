import { IsInt, IsString } from 'class-validator';

export class FindStorageRecordDto {

    @IsInt()
    projectId: number;

    @IsString()
    path: string;

    @IsString()
    recordId: string;

}