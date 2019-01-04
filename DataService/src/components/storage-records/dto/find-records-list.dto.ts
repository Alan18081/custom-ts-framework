import { IsInt } from 'class-validator';
import { PaginationDto } from '@astra/common';

export class FindRecordsListDto extends PaginationDto {

    @IsInt()
    storageId: number;

}