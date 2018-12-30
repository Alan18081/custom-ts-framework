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
import {UpdateStorageDataDto} from './dto/update-storage-data.dto';

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

    const [message, storage] = await Promise.all([
        messageBroker.sendMessageAndGetResponse(
          QueuesEnum.DATA_SERVICE,
          CommunicationCodes.GET_STORAGE_DATA_BY_STORAGE,
            { storageId: query.id }
        ),
        this.storagesService.findOneById(query.id)
    ]);

    storage.data = message.payload.data;

    return storage;
  }

  @SubscribeMessage(CommunicationCodes.CREATE_STORAGE)
  async createOne(body: CreateStorageDto): Promise<Storage> {
    await this.validatorService.validate(body, CreateStorageDto);

    const project = await this.projectsService.findOneByUser(body.projectId, body.userId);

    if(!project) {
      throw new NotFound({ error: Messages.PROJECT_NOT_FOUND });
    }

    const storage = await this.storagesService.findOneByName(body.name);

    if(storage) {
      throw new BadRequest({ error: Messages.STORAGE_NAME_ERROR });
    }

    const { userId, ...data } = body;

    const newStorage = await this.storagesService.createOne({ ...data });


      const { payload } = await messageBroker.sendMessageAndGetResponse(
        QueuesEnum.DATA_SERVICE,
        CommunicationCodes.CREATE_STORAGE_DATA,
        { storageId: newStorage.id, projectId: body.projectId, userId: body.userId }
      );

      console.log(payload);

    return await this.storagesService.updateOne(newStorage.id, { dataId: payload.id });
  }

  @SubscribeMessage(CommunicationCodes.UPDATE_STORAGE_DATA)
  async updateOneData(body: UpdateStorageDataDto): Promise<Storage | undefined> {
    await this.validatorService.validate(body, UpdateStorageDataDto);
    console.log(body);

    const storage = await this.storagesService.findOneById(body.id);

    console.log(storage);

    if(!storage) {
      throw new NotFound({ error: Messages.STORAGE_NOT_FOUND });
    }

    const { payload } = await messageBroker.sendMessageAndGetResponse(
      QueuesEnum.DATA_SERVICE,
      CommunicationCodes.CHANGE_STORAGE_DATA,
        { id: storage.dataId, data: body.data }
    );

    storage.data = payload.data;

    return storage;

  }

  @SubscribeMessage(CommunicationCodes.REMOVE_STORAGE)
  async removeOne(body: RemoveStorageDto): Promise<void> {
    await this.validatorService.validate(body, RemoveStorageDto);

    await this.storagesService.removeOne(body.id);
  }

}