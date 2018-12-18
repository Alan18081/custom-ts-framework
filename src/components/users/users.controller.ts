import {Controller, Get, Post, Put,} from '../../common/server/decorators';
import { UsersService } from './users.service';
import { UseValidator } from '../../common/filter/decorators';
import { Validator } from '../../common/helpers';
import { Body, Headers, Param, UseMiddlewares } from '../../common/server/route-params.decorators';
import {BadRequest} from '../../common/server/http-error';

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