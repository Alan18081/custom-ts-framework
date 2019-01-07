import {injectable} from 'inversify';
import {
    Body,
    CommunicationCodes,
    Controller, Delete,
    Get,
    IProjectAccount, IStorage, IStorageRecord,
    Param,
    Post,
    ProjectAccount, Put,
    QueuesEnum, StorageType, Unauthorized,
    UseGuards,
    Messages, NotFound,
} from '@astra/common';
import {JwtProjectGuard} from '../../helpers/guards/jwt-project.guard';
import {messageBroker} from '../../helpers/message-broker';
import {JwtProjectAccountGuard} from '../../helpers/guards/jwt-project-account.guard';

@injectable()
@Controller('storages/protected/:path')
export class ProtectedUserStoragesController {

    @Get('')
    @UseGuards(JwtProjectAccountGuard)
    async findStorageRecordsList(
        @Param('path') path: string,
        @ProjectAccount() account: IProjectAccount
    ) {
        const storageMessage = await messageBroker.sendMessageAndGetResponse(
            QueuesEnum.PROJECTS_SERVICE,
            CommunicationCodes.GET_STORAGE_BY_PATH,
            { path }
        );

        const storage: IStorage = storageMessage.payload;

        if(storage.typeId === StorageType.PROTECTED && !account) {
            throw new Unauthorized({ error: Messages.UNAUTHORIZED });
        }

        const message = await messageBroker.sendMessageAndGetResponse(
          QueuesEnum.DATA_SERVICE,
          CommunicationCodes.GET_STORAGE_RECORDS_LIST,
            { projectId: account.projectId, path, accountId: account.id }
        );

        return message.payload;
    }

    @Get(':recordId')
    @UseGuards(JwtProjectAccountGuard)
    async getStorageDataRecord(
        @Param('path') path: string,
        @Param('recordId') recordId: string,
        @ProjectAccount() account: IProjectAccount
    ): Promise<IStorageRecord | undefined> {
        const message = await messageBroker.sendMessageAndGetResponse(
          QueuesEnum.DATA_SERVICE,
          CommunicationCodes.GET_STORAGE_RECORD,
            { projectId: account.projectId, path, id: recordId, accountId: account.id}
        );

        return message.payload;
    }

    @Post('')
    @UseGuards(JwtProjectAccountGuard)
    async createStorageRecordData(
        @Param('path') path: string,
        @ProjectAccount() account: IProjectAccount,
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
            { projectId: account.projectId, storageId: storage.id, path, data: body, accountId: account.id}
        );

        return message.payload;
    }

    @Put(':recordId')
    @UseGuards(JwtProjectAccountGuard)
    async updateStorageRecordData(
        @Param('path') path: string,
        @Param('recordId') recordId: string,
        @ProjectAccount() account: IProjectAccount,
        @Body() body: any,
    ): Promise<IStorageRecord | undefined> {
        const message = await messageBroker.sendMessageAndGetResponse(
            QueuesEnum.DATA_SERVICE,
            CommunicationCodes.UPDATE_STORAGE_RECORD,
            { projectId: account.projectId, path, record: body, accountId: account.id}
        );

        return message.payload;
    }

    @Delete(':recordId')
    @UseGuards(JwtProjectGuard)
    async removeOne(
        @Param('path') path: string,
        @Param('recordId') recordId: string,
        @ProjectAccount() account: IProjectAccount,
    ): Promise<void> {
        await messageBroker.sendMessageAndGetResponse(
            QueuesEnum.DATA_SERVICE,
            CommunicationCodes.REMOVE_STORAGE_RECORD,
            { projectId: account.projectId, path, recordId, accountId: account.id }
        );
    }

}