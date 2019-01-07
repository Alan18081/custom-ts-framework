import {injectable} from 'inversify';
import {
    Body,
    CommunicationCodes,
    Controller, Delete,
    Get,
    IStorageRecord,
    Param,
    Post,
    Put,
    QueuesEnum,
    UseGuards,
    Project, IProject, IStorage, NotFound, Messages,
} from '@astra/common';
import {JwtProjectGuard} from '../../helpers/guards/jwt-project.guard';
import {messageBroker} from '../../helpers/message-broker';

@injectable()
@Controller('storages/public/:path')
export class PublicUserStoragesController {

    @Get('')
    @UseGuards(JwtProjectGuard)
    async findStorageRecordsList(
        @Param('path') path: string,
        @Project() project: IProject
    ) {
        const message = await messageBroker.sendMessageAndGetResponse(
          QueuesEnum.DATA_SERVICE,
          CommunicationCodes.GET_STORAGE_RECORDS_LIST,
            { projectId: project.id, path }
        );

        return message.payload;
    }

    @Get(':recordId')
    @UseGuards(JwtProjectGuard)
    async getStorageDataRecord(
        @Param('recordId') recordId: string,
    ): Promise<IStorageRecord | undefined> {
        const message = await messageBroker.sendMessageAndGetResponse(
          QueuesEnum.DATA_SERVICE,
          CommunicationCodes.GET_STORAGE_RECORD,
            { id: recordId }
        );

        return message.payload;
    }

    @Post('')
    @UseGuards(JwtProjectGuard)
    async createStorageRecordData(
        @Param('path') path: string,
        @Project() project: IProject,
        @Body() body: any,
    ): Promise<IStorageRecord> {
        const storageMessage = await messageBroker.sendMessageAndGetResponse(
          QueuesEnum.PROJECTS_SERVICE,
          CommunicationCodes.GET_STORAGE_BY_PATH,
            { path }
        );

        const storage: IStorage = storageMessage.payload;

        if(!storage) {
            throw new NotFound({ error: Messages.STORAGE_NOT_FOUND });
        }

        const message = await messageBroker.sendMessageAndGetResponse(
            QueuesEnum.DATA_SERVICE,
            CommunicationCodes.CREATE_STORAGE_RECORD,
            { projectId: project.id, path, data: body, storageId: storage.id }
        );

        return message.payload;
    }

    @Put(':recordId')
    @UseGuards(JwtProjectGuard)
    async updateStorageRecordData(
        @Param('recordId') recordId: string,
        @Body() body: any,
    ): Promise<IStorageRecord | undefined> {
        const message = await messageBroker.sendMessageAndGetResponse(
            QueuesEnum.DATA_SERVICE,
            CommunicationCodes.UPDATE_STORAGE_RECORD,
            { id: recordId, data: body}
        );

        return message.payload;
    }

    @Delete(':recordId')
    @UseGuards(JwtProjectGuard)
    async removeOne(
        @Param('recordId') recordId: string,
    ): Promise<void> {
        await messageBroker.sendMessageAndGetResponse(
            QueuesEnum.DATA_SERVICE,
            CommunicationCodes.REMOVE_STORAGE_RECORD,
            { id: recordId }
        );
    }

}