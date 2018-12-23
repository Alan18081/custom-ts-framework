import {IsInt} from 'class-validator';
import {BaseDto} from '../../../../../Common/dto/base.dto';

export class FindUserDto extends BaseDto {

    @IsInt()
    id: number;
}