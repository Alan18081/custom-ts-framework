import { IsInt, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '@astra/common';

export class FindRecordsListDto extends PaginationDto {

    @IsInt()
    projectId: number;

    @IsString()
    path: number;

    @IsInt()
    @IsOptional()
    accountId: number;

}