import {IsInt, IsOptional} from 'class-validator';
import { BaseDto } from '@astra/common';

export class PaginationDto extends BaseDto {
    @IsOptional()
    @IsInt()
    page?: number;

    @IsOptional()
    @IsInt()
    limit?: number;
}