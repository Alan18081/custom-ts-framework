import * as knex from 'knex';
import {} from './config';

export const db = knex(config.UsersService.database);

