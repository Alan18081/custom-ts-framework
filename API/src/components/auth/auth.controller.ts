import { injectable } from 'inversify';
import {Body, CommunicationCodes, Controller, Get, Post, QueuesEnum} from '@astra/common';
import { messageBroker } from '../../helpers/message-broker';
import { Login } from './interfaces/login';
import {LoginProject} from './interfaces/login-project';

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

  @Post('login/project')
  async loginProject(@Body() body: LoginProject): Promise<any> {
    const message = await messageBroker.sendMessageAndGetResponse(
      QueuesEnum.AUTH_SERVICE,
      CommunicationCodes.LOGIN_PROJECT,
      body
    );

    return message.payload;
  }

  @Get('google')
  async loginGoogle(): Promise<any> {}

}