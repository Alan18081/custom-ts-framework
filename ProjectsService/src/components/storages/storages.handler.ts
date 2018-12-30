import { inject, injectable } from 'inversify';
import { CommunicationCodes, SubscribeMessage, ValidatorService, Messages, NotFound, QueuesEnum, BadRequest } from '@astra/common';
import { CreateStorageDto } from './dto/create-storage.dto';
import { StoragesService } from './storages.service';
import { RemoveStorageDto } from './dto/remove-storage.dto';
import { FindStorageListDto } from './dto/find-storage-list.dto';
import { FindStorageDto } from './dto/find-storage.dto';
import {Storage} from './storage';
import {ProjectsService} from '../projects/projects.service';
import {messageBroker} from '../../helpers/message-broker';

@injectable()
export class StoragesHandler {

  @inject(ValidatorService)
  private readonly validatorService: ValidatorService;

  @inject(StoragesService)
  private readonly storagesService: StoragesService;

  @inject(ProjectsService)
  private readonly projectsService: ProjectsService;

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

    const project = await this.projectsService.findOneByUser(body.projectId, body.userId);

    if(!project) {
      throw new NotFound({ error: Messages.PROJECT_NOT_FOUND });
    }

    const storage = await this.storagesService.findOneByName(body.name);
    console.log('Found storage', storage);

    if(storage) {
      throw new BadRequest({ error: Messages.STORAGE_NAME_ERROR });
    }

      const { payload } = await messageBroker.sendMessageAndGetResponse(
          QueuesEnum.DATA_SERVICE,
          CommunicationCodes.CREATE_STORAGE_DATA,
          { }
      );

    console.log('Payload from data service', payload);

    const newStorage = await this.storagesService.createOne({ ...body, dataId: payload._id });

    newStorage.data = payload.data;

    return newStorage;
  }

  @SubscribeMessage(CommunicationCodes.REMOVE_STORAGE)
  async removeOne(body: RemoveStorageDto): Promise<void> {
    await this.validatorService.validate(body, RemoveStorageDto);

    await this.storagesService.removeOne(body.id);
  }

}