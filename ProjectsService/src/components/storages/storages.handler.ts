import { inject, injectable } from 'inversify';
import { CommunicationCodes, Storage, SubscribeMessage, ValidatorService } from '@astra/common';
import { CreateStorageDto } from './dto/create-storage.dto';
import { StoragesService } from './storages.service';
import { RemoveStorageDto } from './dto/remove-storage.dto';
import { FindStorageListDto } from './dto/find-storage-list.dto';
import { FindStorageDto } from './dto/find-storage.dto';

@injectable()
export class StoragesHandler {

  @inject(ValidatorService)
  private readonly validatorService: ValidatorService;

  @inject(StoragesService)
  private readonly storagesService: StoragesService;

  @SubscribeMessage(CommunicationCodes.GET_STORAGES_LIST)
  async findManyByProject(query: FindStorageListDto): Promise<Storage[]> {
    await this.validatorService.validate(query, FindStorageListDto);

    return await this.storagesService.findManyByProject(query.projectId);
  }

  @SubscribeMessage(CommunicationCodes.GET_STORAGE)
  async findOneById(query: FindStorageDto): Promise<Storage | undefined> {
    await this.validatorService.validate(query, FindStorageDto);

    return await this.storagesService.findOneById(query.id);
  }

  @SubscribeMessage(CommunicationCodes.CREATE_STORAGE)
  async createOne(body: CreateStorageDto): Promise<Storage> {
    await this.validatorService.validate(body, CreateStorageDto);

    return await this.storagesService.createOne(body);
  }

  @SubscribeMessage(CommunicationCodes.REMOVE_STORAGE)
  async removeOne(body: RemoveStorageDto): Promise<void> {
    await this.validatorService.validate(body, RemoveStorageDto);

    await this.storagesService.removeOne(body.id);
  }

}