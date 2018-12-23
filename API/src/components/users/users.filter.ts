import {injectable} from 'inversify';
import { CreateUserDto } from './dto/create-user.dto';
import {validate} from 'class-validator';
import { BadRequest } from '../../lib/server/http-error';

@injectable()
export class UsersFilter {

   async createUser(data: CreateUserDto): Promise<void> {
       const body = new CreateUserDto(data);
       const errors = await validate(body);
       if(errors.length) {
           const errorMessages = errors.map(({ property, constraints }) => ({
               property,
               constrains: Object.keys(constraints).map(key => constraints[key])
           }));
           throw new BadRequest({ errors: errorMessages });
       }
   }

}