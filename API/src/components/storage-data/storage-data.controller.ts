import {Body, CommunicationCodes, Controller, IStorageData, Put, UseGuards, QueuesEnum} from '@astra/common';
import {injectable} from 'inversify';
import {JwtGuard} from '../../helpers/guards/jwt.guard';
import {messageBroker} from '../../helpers/message-broker';

@Controller('storageData')
@injectable()
export class StorageDataController {

    @Put(':id')
    @UseGuards(JwtGuard)
    async updateOne(@Body() body: any): Promise<IStorageData | undefined> {
        const message =  await messageBroker.sendMessageAndGetResponse(
            QueuesEnum.DATA_SERVICE,
            CommunicationCodes.UPDATE_STORAGE_DATA,
            body,
        );

        return message.payload;
    }

}