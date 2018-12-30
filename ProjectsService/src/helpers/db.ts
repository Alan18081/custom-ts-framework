import * as knex from 'knex';
import { config } from '@astra/common';

export const db = knex(config.ProjectsService.database);