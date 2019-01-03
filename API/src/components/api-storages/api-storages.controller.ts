import {injectable} from 'inversify';
import {
    Body,
    CommunicationCodes,
    Controller, Delete,
    Get,
    IProject,
    Param,
    Post,
    Project, Put,
    QueuesEnum,
    UseGuards
} from '@astra/common';
import {JwtProjectGuard} from '../../helpers/guards/jwt-project.guard';
import {messageBroker} from '../../helpers/message-broker';

@injectable()
@Controller('apiStorages')
export class ApiStoragesController {

    @Get(':path')
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

    @Get(':path/:recordId')
    @UseGuards(JwtProjectGuard)
    async getStorageDataRecord(
        @Param('path') path: string,
        @Param('recordId') recordId: string,
        @Project() project: IProject
    ): Promise<any> {
        const message = await messageBroker.sendMessageAndGetResponse(
          QueuesEnum.DATA_SERVICE,
          CommunicationCodes.GET_STORAGE_RECORD,
            { projectId: project.id, path, recordId}
        );

        return message.payload;
    }

    @Post(':path')
    @UseGuards(JwtProjectGuard)
    async createStorageRecordData(
        @Param('path') path: string,
        @Project() project: IProject,
        @Body() body: any,
    ): Promise<any> {
        const message = await messageBroker.sendMessageAndGetResponse(
            QueuesEnum.DATA_SERVICE,
            CommunicationCodes.CREATE_STORAGE_RECORD,
            { projectId: project.id, path, record: body}
        );

        return message.payload;
    }

    @Put(':path/:recordId')
    @UseGuards(JwtProjectGuard)
    async updateStorageRecordData(
        @Param('path') path: string,
        @Param('recordId') recordId: string,
        @Project() project: IProject,
        @Body() body: any,
    ): Promise<any> {
        const message = await messageBroker.sendMessageAndGetResponse(
            QueuesEnum.DATA_SERVICE,
            CommunicationCodes.UPDATE_STORAGE_RECORD,
            { projectId: project.id, path, record: body}
        );

        return message.payload;
    }

    @Delete(':path/:recordId')
    @UseGuards(JwtProjectGuard)
    async removeOne(
        @Param('path') path: string,
        @Param('recordId') recordId: string,
        @Project() project: IProject,
        @Body() body: any,
    ): Promise<any> {
        const message = await messageBroker.sendMessageAndGetResponse(
            QueuesEnum.DATA_SERVICE,
            CommunicationCodes.REMOVE_STORAGE_RECORD,
            { projectId: project.id, path, recordId }
        );

        return message.payload;
    }

}