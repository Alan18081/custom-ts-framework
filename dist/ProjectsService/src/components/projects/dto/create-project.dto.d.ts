import { BaseDto } from '@astra/common';
export declare class CreateProjectDto extends BaseDto {
    userId: number;
    name: string;
    description?: string;
}
