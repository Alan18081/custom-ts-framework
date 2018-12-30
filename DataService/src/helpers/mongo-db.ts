import { MongoClient } from 'mongodb';
import { config } from '@astra/common';

export const client = new MongoClient(config.DataService.database.url);