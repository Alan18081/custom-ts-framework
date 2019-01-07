import { inject, injectable } from 'inversify';
import {
    CommunicationCodes,
    SubscribeMessage,
    Messages,
    NotFound,
    QueuesEnum,
    BadRequest,
    PaginatedResponse,
    Forbidden,
    Validate
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
import {ChangeStorageTypeDto} from './dto/change-storage-type.dto';
import {FindStorageByPathDto} from './dto/find-storage-by-path.dto';

@injectable()
export class StoragesHandler {

  @inject(StoragesService)
  private readonly storagesService: StoragesService;

  @inject(ProjectsService)
  private readonly projectsService: ProjectsService;

  @SubscribeMessage(CommunicationCodes.GET_STORAGES_LIST)
  @Validate(FindStorageListDto)
  async findManyByProject(query: FindStorageListDto): Promise<Storage[] | PaginatedResponse<Storage>> {
    const project = await this.projectsService.findOneByUser(query.projectId, query.userId);

    if(!project) {
        throw new Forbidden({ error: Messages.INVALID_PERMISSIONS });
    }

    if(query.page && query.limit) {
      return await this.storagesService.findManyWithPagination(query);
    }

    return await this.storagesService.findManyByProject(query.projectId);
  }

  @SubscribeMessage(CommunicationCodes.GET_STORAGE)
  @Validate(FindStorageDto)
  async findOneById(query: FindStorageDto): Promise<Storage | undefined> {
    if(!query.includeData) {
      return await this.storagesService.findOneById(query.id);
    }

    const [message, storage] = await Promise.all([
        messageBroker.sendMessageAndGetResponse(
          QueuesEnum.DATA_SERVICE,
          CommunicationCodes.GET_STORAGE_RECORDS_LIST,
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

    @SubscribeMessage(CommunicationCodes.GET_STORAGE_BY_PATH)
    @Validate(FindStorageByPathDto)
    async findOneByPath(query: FindStorageByPathDto): Promise<Storage | undefined> {
        return this.storagesService.findOneByPath(query.path);
    }

  @SubscribeMessage(CommunicationCodes.CREATE_STORAGE)
  @Validate(CreateStorageDto)
  async createOne(body: CreateStorageDto): Promise<Storage> {
    const project = await this.projectsService.findOneByUser(body.projectId, body.userId);

    if(!project) {
      throw new NotFound({ error: Messages.PROJECT_NOT_FOUND });
    }

    const storageByPath = await this.storagesService.findOneByPath(body.path);

    if(storageByPath) {
        throw new BadRequest({ error: Messages.STORAGE_PATH_ERROR });
    }

    const storageByName = await this.storagesService.findOneByName(body.name);

    if(storageByName) {
        throw new BadRequest({ error: Messages.STORAGE_NAME_ERROR });
    }

    const { userId, ...data } = body;

    return await this.storagesService.createOne({ ...data });
  }

  @SubscribeMessage(CommunicationCodes.UPDATE_STORAGE)
  @Validate(UpdateStorageDto)
  async updateOneData(body: UpdateStorageDto): Promise<Storage | undefined> {
    return await this.storagesService.updateOne(body.id, body);

  }

  @SubscribeMessage(CommunicationCodes.REMOVE_STORAGE)
  @Validate(RemoveStorageDto)
  async removeOne(body: RemoveStorageDto): Promise<void> {
    await Promise.all([
        this.storagesService.removeOne(body.id),
        messageBroker.sendMessageAndGetResponse(
            QueuesEnum.DATA_SERVICE,
            CommunicationCodes.REMOVE_STORAGE_RECORD,
            { storageId: body.id }
        )
    ]);

  }

  @SubscribeMessage(CommunicationCodes.CHANGE_STORAGE_TYPE)
  @Validate(ChangeStorageTypeDto)
  async changeType(body: ChangeStorageTypeDto): Promise<Storage | undefined> {
      return await this.storagesService.changeType(body);
  }

}