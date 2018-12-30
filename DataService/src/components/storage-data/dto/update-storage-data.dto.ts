import { BaseDto } from '@astra/common';
import { IsInt, IsDefined } from 'class-validator';

export class UpdateStorageDataDto extends BaseDto {

    @IsInt()
    storageId: number;

    @IsDefined()
    data: object;

}