import { BaseDto } from '@astra/common';
import { IsDefined, IsInt } from 'class-validator';

export class UpdateStorageDataDto extends BaseDto {

    @IsInt()
    id: number;

    @IsDefined()
    data: object;

}