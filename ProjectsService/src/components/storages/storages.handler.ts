import { inject, injectable } from 'inversify';
import { ValidatorService } from '../core/services/validator.service';
import { CommunicationCodes, SubscribeMessage } from '@astra/common';
import { CreateStorageDto } from './dto/create-storage.dto';
import { StoragesService } from './storages.service';
import { RemoveStorageDto } from './dto/remove-storage.dto';

@injectable()
export class StoragesHandler {

  @inject(ValidatorService)
  private readonly validatorService: ValidatorService;

  @inject(StoragesService)
  private readonly storagesService: StoragesService;

  @SubscribeMessage(CommunicationCodes.CREATE_STORAGE)
  async createOne(body: CreateStorageDto): Promise<Storage> {
    await this.validatorService.validate(body, CreateStorageDto);

    return await this.storagesService.createOne(body);
  }

  @SubscribeMessage(CommunicationCodes.REMOVE_STORAGE)
  async removeOne(body: RemoveStorageDto): Promise<Storage> {
    await this.validatorService.validate(body, RemoveStorageDto);

    return await this.storagesService.removeOne(body.id);
  }

}