import { Controller, Get, Post, } from '../server/decorators';
import { UsersService } from './users.service';
import { UseValidator } from '../filter/decorators';
import { Validator } from '../helpers';
import { Body, Headers, Param, UseMiddlewares } from '../server/route-params.decorators';

class ValidateUser implements Validator {
  validate(@Body() body: any): boolean {
    console.log(body);
    return false;
  }
}

@Controller('users')
export class UsersController {

  constructor(
    private readonly someService: UsersService
  ) {}


  @Get('list/:id')
  @UseMiddlewares((req, res, next) => {
    console.log(req.method);
    next();
  })
  async getUsers(@Headers('authorization') token: string, @Param('id') id: number) {
    console.log(typeof token);
    // console.log('My service', this.someService.findOne());
    // console.log('From route', id);
    // console.log('From route: token', token);
  }

  @Post('')
  @UseValidator(ValidateUser)
  async getMark(@Body() body: any) {
    // console.log('From second route', id);
  }
}