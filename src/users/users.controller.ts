import { Controller, Get, Headers, Param } from '../server';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(
    private readonly someService: UsersService
  ) {}


  @Get('list/:id', (req, res, next) => {
    console.log(req.method);
    next();
  })
  async getUsers(@Headers('authorization') token: string, @Param('id') id: number) {
    console.log('My service', this.someService.findOne());
    console.log('From route', id);
    console.log('From route: token', token);
  }

  @Get('mark/:id')
  async getMark(@Param('id') id: number) {
    console.log('From second route', id);
  }
}