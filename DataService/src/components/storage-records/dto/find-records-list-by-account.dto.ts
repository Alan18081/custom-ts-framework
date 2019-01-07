import { IsInt } from 'class-validator';

export class FindRecordsListByAccountDto {

    @IsInt()
    accountId: number;

    @IsInt()
    storageId: number;

}