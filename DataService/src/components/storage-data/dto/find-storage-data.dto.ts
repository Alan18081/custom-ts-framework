import { BaseDto } from '@astra/common';
import { IsMongoId } from 'class-validator';

export class FindStorageDataDto extends BaseDto {

    @IsMongoId()
    id: string;

}