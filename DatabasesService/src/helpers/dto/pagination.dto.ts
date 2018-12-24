import {IsInt, IsOptional} from 'class-validator';
import { BaseDto } from '../../../../Common/dto/base.dto';

export class PaginationDto extends BaseDto {
    @IsOptional()
    @IsInt()
    page?: number;

    @IsOptional()
    @IsInt()
    limit?: number;
}