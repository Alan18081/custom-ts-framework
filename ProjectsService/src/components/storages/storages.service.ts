import { injectable } from 'inversify';
import { CreateStorageDto } from './dto/create-storage.dto';
import { StorageModel } from './storage.model';
import { UpdateProjectDto } from '../projects/dto/update-project.dto';

@injectable()
export class StoragesService {

  async findManyByProject(projectId: number): Promise<Storage[]> {
    return await StorageModel.find({ projectId });
  }

  async findOneById(id: number): Promise<Storage | undefined> {
    return await StorageModel.findOne({ id });
  }

  async createOne(data: CreateStorageDto): Promise<Storage> {
    const storage = new StorageModel({
      ...data,
    });

    return await StorageModel.save(storage);
  }

  async updateOne(data: UpdateProjectDto): Promise<Storage | undefined> {
    return await StorageModel.update({ id: data.id }, { ...data });
  }

  async removeOne(id: number): Promise<void> {
    await StorageModel.delete({ id });
  }
}

