import { BaseDto } from '@astra/common';
import { IsMongoId, IsJSON } from 'class-validator';

export class UpdateStorageDataDto extends BaseDto {

    @IsMongoId()
    id: string;

    @IsJSON()
    data: string;

}