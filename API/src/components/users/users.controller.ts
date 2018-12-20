import {Controller, Post} from '../../server/route-decorators';
import {Body} from '../../server/route-params.decorators';


@Controller('users')
export class UsersController {

    constructor(

    ) {}

    @Post('')
    async createOne(@Body() body: any) {

    }

}