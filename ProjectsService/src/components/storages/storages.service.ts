import { injectable, inject } from 'inversify';
import { Storage } from './storage';
import {StoragesRepository} from './storages.repository';
import {Transaction} from 'knex';
import {ProjectsService} from '../projects/projects.service';

@injectable()
export class StoragesService {

  @inject(StoragesRepository)
  private readonly storagesRepository: StoragesRepository;

  @inject(ProjectsService)
  private readonly projectsService: ProjectsService;

  async findManyByProject(projectId: number): Promise<Storage[]> {
    return await this.storagesRepository.find({ projectId });
  }

  async findOneById(id: number): Promise<Storage | undefined> {
    return await this.storagesRepository.findOne({ id });
  }

  async findOneByPath(path: string): Promise<Storage | undefined> {
      return await this.storagesRepository.findOne({ path: path });
  }

  async createOne(data: Partial<Storage>): Promise<Storage> {
    const storage = new Storage({
      ...data,
    });

    return this.storagesRepository.transaction(async (ctx: Transaction) => {
        try {
            const savedStorage = await this.storagesRepository.save(storage);
            await this.projectsService.incrementStoragesCount(savedStorage.id);
            await ctx.commit(savedStorage);
        } catch (e) {
            console.log('[Transaction Error]', e);
            await ctx.rollback();
        }
    });
  }

  async updateOne(id: number, data: Partial<Storage>): Promise<Storage | undefined> {
    return await this.storagesRepository.update({ id }, { ...data });
  }

  async removeOne(id: number): Promise<void> {
      this.storagesRepository.transaction(async (ctx: Transaction) => {
          try {
              await Promise.all([
                  this.storagesRepository.delete({ id }),
                  this.projectsService.decrementStoragesCount(id)
              ]);
          } catch (e) {
              await ctx.rollback();
          }

      });
  }
}

