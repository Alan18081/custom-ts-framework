import { injectable } from 'inversify';
import { Controller, Post, Body, Message, QueuesEnum, CommunicationCodes  } from '@astra/common';
import { messageBroker } from '../../helpers/message-broker';
import { Login } from './interfaces/login';

@Controller('auth')
@injectable()
export class AuthController {

  @Post('login')
  async login(@Body() body: Login): Promise<any> {
    const message = new Message(CommunicationCodes.LOGIN, body);
    return await messageBroker.sendMessageAndGetResponse(QueuesEnum.AUTH_SERVICE, message);
  }

}