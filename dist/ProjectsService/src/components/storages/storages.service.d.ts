import { Storage } from '@astra/common';
import { CreateStorageDto } from './dto/create-storage.dto';
import { UpdateProjectDto } from '../projects/dto/update-project.dto';
export declare class StoragesService {
    findManyByProject(projectId: number): Promise<Storage[]>;
    findOneById(id: number): Promise<Storage | undefined>;
    createOne(data: CreateStorageDto): Promise<Storage>;
    updateOne(data: UpdateProjectDto): Promise<Storage | undefined>;
    removeOne(id: number): Promise<void>;
}
