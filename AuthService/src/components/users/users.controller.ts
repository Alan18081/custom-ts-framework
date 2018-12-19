import {Controller, Get, Post, Put,} from '../../common/server/route-decorators';
import { UsersService } from './users.service';
import { Body, Headers, Param, UseMiddlewares } from '../../common/server/route-params.decorators';
import {User} from "./user.interface";
import {UseGuards} from "../../common/server/guards-decorators";
import {AuthGuard} from "../auth/auth.guard";

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService
  ) {}


  @Get('')
  @UseGuards(AuthGuard)
  async getUsers(@Param('id') id: number): Promise<User[]> {
    return [];
    // return await this.usersService.findAll();
  }

  @Post('')
  async createOne(@Body() body: any): Promise<User> {
    return await this.usersService.createOne(body);
  }

  @Put(':id')
  async updateOne(@Param('id') id: number, @Body() body: any): Promise<User | undefined> {
    // return await this.usersService.updateOne(id, body);
      return null;
  }
}