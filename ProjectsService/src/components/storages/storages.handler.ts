import { inject, injectable } from 'inversify';
import {
    CommunicationCodes,
    SubscribeMessage,
    ValidatorService,
    Messages,
    NotFound,
    QueuesEnum,
    BadRequest,
    PaginatedResponse
} from '@astra/common';
import { CreateStorageDto } from './dto/create-storage.dto';
import { StoragesService } from './storages.service';
import { RemoveStorageDto } from './dto/remove-storage.dto';
import { FindStorageListDto } from './dto/find-storage-list.dto';
import { FindStorageDto } from './dto/find-storage.dto';
import {Storage} from './storage';
import {ProjectsService} from '../projects/projects.service';
import {messageBroker} from '../../helpers/message-broker';
import {UpdateStorageDto} from './dto/update-storage.dto';

@injectable()
export class StoragesHandler {

  @inject(ValidatorService)
  private readonly validatorService: ValidatorService;

  @inject(StoragesService)
  private readonly storagesService: StoragesService;

  @inject(ProjectsService)
  private readonly projectsService: ProjectsService;

  @SubscribeMessage(CommunicationCodes.GET_STORAGES_LIST)
  async findManyByProject(query: FindStorageListDto): Promise<Storage[] | PaginatedResponse<Storage>> {
    await this.validatorService.validate(query, FindStorageListDto);

    if(query.page && query.limit) {
      return await this.storagesService.findManyWithPagination(query);
    }

    return await this.storagesService.findManyByProject(query.projectId);
  }

  @SubscribeMessage(CommunicationCodes.GET_STORAGE)
  async findOneById(query: FindStorageDto): Promise<Storage | undefined> {
    await this.validatorService.validate(query, FindStorageDto);

    if(!query.includeData) {
      return await this.storagesService.findOneById(query.id);
    }

    const [message, storage] = await Promise.all([
        messageBroker.sendMessageAndGetResponse(
          QueuesEnum.DATA_SERVICE,
          CommunicationCodes.GET_STORAGE_DATA_BY_STORAGE,
            { storageId: query.id }
        ),
        this.storagesService.findOneById(query.id)
    ]);

    if(!message.payload) {
      throw new NotFound({ error: Messages.STORAGE_NOT_FOUND });
    }

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

    const storageByPath = await this.storagesService.findOneByPath(body.path);

    if(storageByPath) {
        throw new BadRequest({ error: Messages.STORAGE_PATH_ERROR });
    }

    const { userId, ...data } = body;

    return await this.storagesService.createOne({ ...data });
  }

  @SubscribeMessage(CommunicationCodes.UPDATE_STORAGE)
  async updateOneData(body: UpdateStorageDto): Promise<Storage | undefined> {
    await this.validatorService.validate(body, UpdateStorageDto);

    return await this.storagesService.updateOne(body.id, body);

  }

  @SubscribeMessage(CommunicationCodes.REMOVE_STORAGE)
  async removeOne(body: RemoveStorageDto): Promise<void> {
    await this.validatorService.validate(body, RemoveStorageDto);

    await Promise.all([
        this.storagesService.removeOne(body.id),
        messageBroker.sendMessageAndGetResponse(
            QueuesEnum.DATA_SERVICE,
            CommunicationCodes.REMOVE_STORAGE_DATA,
            { storageId: body.id }
        )
    ]);

  }

}