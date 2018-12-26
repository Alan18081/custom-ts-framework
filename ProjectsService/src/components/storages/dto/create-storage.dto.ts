import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateStorageDto {

  @IsInt()
  projectId: number;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsInt()
  userId: number;

}