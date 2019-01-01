import {injectable} from 'inversify';
import {
    Body,
    CommunicationCodes,
    Controller,
    Get,
    IProject,
    Param,
    Post,
    Project,
    QueuesEnum,
    UseGuards
} from '@astra/common';
import {JwtProjectGuard} from '../../helpers/guards/jwt-project.guard';
import {messageBroker} from '../../helpers/message-broker';

@injectable()
@Controller('apiStorages')
export class ApiStoragesController {

    @Get(':path/:recordId')
    @UseGuards(JwtProjectGuard)
    async getStorageDataRecord(
        @Param('path') path: string,
        @Param('recordId') recordId: string,
        @Project() project: IProject
    ): Promise<any> {
        const message = await messageBroker.sendMessageAndGetResponse(
          QueuesEnum.DATA_SERVICE,
          CommunicationCodes.SET_STORAGE_DATA_RECORD,
            { projectId: project.id, path, recordId}
        );
    }

    @Post(':path')
    @UseGuards(JwtProjectGuard)
    async createStorageRecordData(
        @Param('path') path: string,
        @Param('recordId') recordId: string,
        @Project() project: IProject,
        @Body() body: any,
    ): Promise<any> {
        const message = await messageBroker.sendMessageAndGetResponse(
            QueuesEnum.DATA_SERVICE,
            CommunicationCodes.SET_STORAGE_DATA_RECORD,
            { projectId: project.id, path, record: body}
        );

        return message.payload;
    }

}