import { injectable } from 'inversify';
import { Body, CommunicationCodes, Controller, Post, QueuesEnum } from '@astra/common';
import { messageBroker } from '../../helpers/message-broker';
import { Login } from './interfaces/login';

@Controller('auth')
@injectable()
export class AuthController {

  @Post('login')
  async login(@Body() body: Login): Promise<any> {
    const message = await messageBroker.sendMessageAndGetResponse(
      QueuesEnum.AUTH_SERVICE,
      CommunicationCodes.LOGIN,
      body
    );

    return message.payload;
  }

}