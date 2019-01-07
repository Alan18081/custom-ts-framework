import {
    CommunicationCodes,
    Controller, Delete,
    Get,
    IProjectAccount, IUser,
    Param, Query,
    QueuesEnum,
    ReqUser,
    UseGuards
} from '@astra/common';
import {injectable} from 'inversify';
import { messageBroker } from '../../helpers/message-broker';
import {JwtGuard} from '../../helpers/guards/jwt.guard';

@Controller('projects/:projectId/accounts')
@injectable()
export class ProjectAccountsController {

    @Get('')
    @UseGuards(JwtGuard)
    async findMany(
        @ReqUser() user: IUser,
        @Param('projectId') projectId: number,
        @Query() query: any
    ): Promise<IProjectAccount[]> {
        const message = await messageBroker.sendMessageAndGetResponse(
          QueuesEnum.PROJECTS_SERVICE,
          CommunicationCodes.GET_PROJECT_ACCOUNTS_LIST,
            { projectId, userId: user.id, ...query }
        );

        return message.payload;
    }

    @Get(':id')
    @UseGuards(JwtGuard)
    async findOne(
        @ReqUser() user: IUser,
        @Param('projectId') projectId: number,
        @Param('id') accountId: number,
    ): Promise<IProjectAccount | undefined> {
        const message = await messageBroker.sendMessageAndGetResponse(
            QueuesEnum.PROJECTS_SERVICE,
            CommunicationCodes.GET_PROJECT_ACCOUNT,
            { projectId, userId: user.id, accountId}
        );

        return message.payload;
    }

    @Delete(':id')
    @UseGuards(JwtGuard)
    async removeOne(
        @ReqUser() user: IUser,
        @Param('projectId') projectId: number,
        @Param('id') accountId: number,
    ): Promise<void> {
        const message = await messageBroker.sendMessageAndGetResponse(
            QueuesEnum.PROJECTS_SERVICE,
            CommunicationCodes.REMOVE_PROJECT_ACCOUNT_BY_PROJECT_OWNER,
            { projectId, userId: user.id, accountId}
        );

        return message.payload;
    }

}