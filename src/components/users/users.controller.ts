import {Controller, Get, Post, Put,} from '../../lib/server/decorators';
import { UsersService } from './users.service';
import { UseValidator } from '../../filter/decorators';
import { Validator } from '../../helpers';
import { Body, Headers, Param, UseMiddlewares } from '../../lib/server/route-params.decorators';
import {BadRequest} from '../../lib/server/http-error';
import {User} from '../../lib/models/user.entity';

class ValidateUser implements Validator {
  validate(@Body() body: any): void {

  }
}

@Controller('users')
export class UsersController {

  constructor(
    private readonly someService: UsersService
  ) {}


  @Get('')
  @UseMiddlewares((req, res, next) => {
    console.log(req.method);
    next();
  })
  async getUsers(@Headers('authorization') token: string, @Param('id') id: number): Promise<User[]> {
    return await this.someService.findAll();
  }

  @Post('')
  @UseValidator(ValidateUser)
  async createOne(@Body() body: any): Promise<User> {
    return await this.someService.createOne(body);
  }

  @Put(':id')
  async updateOne(@Param('id') id: number, @Body() body: any): Promise<User | undefined> {
    return await this.someService.updateOne(id, body)
  }
}