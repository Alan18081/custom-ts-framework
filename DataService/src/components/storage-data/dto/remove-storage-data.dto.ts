import { BaseDto } from '@astra/common';
import { IsMongoId } from 'class-validator';

export class RemoveStorageDataDto extends BaseDto {

    @IsMongoId()
    id: string;

}