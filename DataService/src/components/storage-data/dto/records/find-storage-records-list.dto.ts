import { IsInt, IsString } from 'class-validator';

export class FindStorageRecordsListDto {

    @IsInt()
    projectId: number;

    @IsString()
    path: string;

}