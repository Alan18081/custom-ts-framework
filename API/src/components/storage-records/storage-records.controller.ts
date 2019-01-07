import {
  Body,
  CommunicationCodes,
  Controller,
  Delete,
  Get,
  IStorage,
  IUser,
  Messages,
  NotFound,
  Param,
  Post,
  QueuesEnum,
  ReqUser,
  UseGuards,
} from '@astra/common';
import { toNumber } from 'lodash';
import { injectable } from 'inversify';
import { JwtGuard } from '../../helpers/guards/jwt.guard';
import { messageBroker } from '../../helpers/message-broker';

@Controller('storages/:storageId/records')
@injectable()
export class StorageRecordsController {

  @Get('')
  @UseGuards(JwtGuard)
  async findMany(@Param('storageId') storageId: number): Promise<IStorage[]> {
    console.log('Storage Id', storageId);
    const message = await messageBroker.sendMessageAndGetResponse(
      QueuesEnum.DATA_SERVICE,
      CommunicationCodes.GET_STORAGE_RECORDS_LIST,
      { storageId: toNumber(storageId) }
    );

    return message.payload;
  }

  @Post('')
  @UseGuards(JwtGuard)
  async createOne(
    @Param('storageId') storageId: number,
    @ReqUser() user: IUser,
    @Body() body: any
  ): Promise<any> {
    const storageMessage = await messageBroker.sendMessageAndGetResponse(
      QueuesEnum.PROJECTS_SERVICE,
      CommunicationCodes.GET_STORAGE,
      { id: storageId }
    );

    const storage: IStorage = storageMessage.payload;

    if(!storage) {
      throw new NotFound({ error: Messages.STORAGE_NOT_FOUND });
    }

    const message = await messageBroker.sendMessageAndGetResponse(
      QueuesEnum.DATA_SERVICE,
      CommunicationCodes.CREATE_STORAGE_RECORD,
      {
        projectId: storage.id,
        storageId,
        userId: user.id,
        path: storage.path,
        data: body
      });

    return message.payload;
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async removeOne(@Param('storageId') storageId: number, @Param('id') id: number): Promise<any> {
    await messageBroker.sendMessageAndGetResponse(
      QueuesEnum.DATA_SERVICE,
      CommunicationCodes.REMOVE_STORAGE_RECORD,
      { storageId, recordId: id }
    );
  }


}