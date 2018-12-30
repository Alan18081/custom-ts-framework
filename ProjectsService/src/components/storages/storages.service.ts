import { injectable, inject } from 'inversify';
import { Storage } from './storage';
import { UpdateProjectDto } from '../projects/dto/update-project.dto';
import {StoragesRepository} from './storages.repository';

@injectable()
export class StoragesService {

  @inject(StoragesRepository)
  private readonly storagesRepository: StoragesRepository;

  async findManyByProject(projectId: number): Promise<Storage[]> {
    return await this.storagesRepository.find({ projectId });
  }

  async findOneById(id: number): Promise<Storage | undefined> {
    return await this.storagesRepository.findOne({ id });
  }

  async findOneByName(name: string): Promise<Storage | undefined> {
    return await this.storagesRepository.findOne({ name });
  }

  async createOne(data: Partial<Storage>): Promise<Storage> {
    const storage = new Storage({
      ...data,
    });


    return this.storagesRepository.save(storage);
  }

  async updateOne(id: number, data: Partial<Storage>): Promise<Storage | undefined> {
    return await this.storagesRepository.update({ id }, { ...data });
  }

  async removeOne(id: number): Promise<void> {
    await this.storagesRepository.delete({ id });
  }
}

