import { IsDefined, IsMongoId } from 'class-validator';
import { BaseDto } from '@astra/common';

export class UpdateRecordDto extends BaseDto {

    @IsMongoId()
    id: string;

    @IsDefined()
    data: any;


}