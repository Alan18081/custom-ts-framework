import { BaseDto } from '@astra/common';
import { IsMongoId, IsDefined } from 'class-validator';

export class UpdateStorageDataDto extends BaseDto {

    @IsMongoId()
    id: string;

    @IsDefined()
    data: object;

}