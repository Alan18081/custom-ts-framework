import {IsInt} from 'class-validator';
import {BaseDto} from '@astra/common';

export class FindUserDto extends BaseDto {

    @IsInt()
    id: number;
}