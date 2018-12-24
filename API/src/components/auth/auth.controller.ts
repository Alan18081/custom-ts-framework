import { injectable } from 'inversify';
import { Controller, Post } from '../../lib/server/route-decorators';
import { Body } from '../../lib/server/route-params.decorators';
import { messageBroker } from '../../lib/broker/message-broker';
import { Login } from './interfaces/login';
import { QueuesEnum } from '../../../../Common';
import { Message } from '@space/common';
import { CommunicationCodes } from '../../../../Common';

@Controller('auth')
@injectable()
export class AuthController {

  @Post('login')
  async login(@Body() body: Login): Promise<any> {
    const message = new Message(CommunicationCodes.LOGIN, body);
    return await messageBroker.sendMessageAndGetResponse(QueuesEnum.AUTH_SERVICE, message);
  }

}