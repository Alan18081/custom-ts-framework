import {BaseDto} from './base.dto';
import {IsInt, IsOptional} from 'class-validator';

export class PaginationDto extends BaseDto {

    @IsInt()
    @IsOptional()
    page?: number;

    @IsInt()
    @IsOptional()
    limit?: number;

}