import {Controller, Post} from '../../server/route-decorators';
import {Body} from '../../server/route-params.decorators';
import {inject, injectable} from 'inversify';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UsersFilter} from './users.filter';

@injectable()
@Controller('users')
export class UsersController {
    @inject(UsersService) usersService: UsersService;
    @inject(UsersFilter) usersFilter: UsersFilter;

    @Post('')
    async createOne(@Body() body: CreateUserDto) {
        await this.usersFilter.createUser(body);
        this.usersService.createUser();
    }

}