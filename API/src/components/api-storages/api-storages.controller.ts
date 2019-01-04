import {injectable} from 'inversify';
import {
    Body,
    CommunicationCodes,
    Controller, Delete,
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

    @Get(':path/records')
    @UseGuards(JwtProjectGuard)
    async findStorageRecordsList(
        @Param('path') path: string,
        @Project() project: IProject
    ): Promise<any> {
        const message = await messageBroker.sendMessageAndGetResponse(
          QueuesEnum.DATA_SERVICE,
          CommunicationCodes.GET_STORAGE_RECORDS_LIST,
            { projectId: project.id, path }
        );

        return message.payload;
    }

    // @Get(':path/records/:recordId')
    // @UseGuards(JwtProjectGuard)
    // async getStorageDataRecord(
    //     @Param('path') path: string,
    //     @Param('recordId') recordId: string,
    //     @Project() project: IProject
    // ): Promise<any> {
    //     const message = await messageBroker.sendMessageAndGetResponse(
    //       QueuesEnum.DATA_SERVICE,
    //       CommunicationCodes.GET_STORAGE_RECORD,
    //         { projectId: project.id, path, recordId}
    //     );
    //
    //     return message.payload;
    // }
    //
    // @Post(':path/records')
    // @UseGuards(JwtProjectGuard)
    // async createStorageRecordData(
    //     @Param('path') path: string,
    //     @Project() project: IProject,
    //     @Body() body: any,
    // ): Promise<any> {
    //     const message = await messageBroker.sendMessageAndGetResponse(
    //         QueuesEnum.DATA_SERVICE,
    //         CommunicationCodes.SET_STORAGE_RECORD,
    //         { projectId: project.id, path, record: body}
    //     );
    //
    //     return message.payload;
    // }
    //
    // @Delete(':path/records/:recordId')
    // @UseGuards(JwtProjectGuard)
    // async removeStorageRecordData(
    //     @Param('path') path: string,
    //     @Param('recordId') recordId: string,
    //     @Project() project: IProject,
    //     @Body() body: any,
    // ): Promise<any> {
    //     const message = await messageBroker.sendMessageAndGetResponse(
    //         QueuesEnum.DATA_SERVICE,
    //         CommunicationCodes.REMOVE_STORAGE_RECORD,
    //         { projectId: project.id, path, recordId }
    //     );
    //
    //     return message.payload;
    // }

}