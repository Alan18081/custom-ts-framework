import { Module } from '../../module';
import {Repository} from '../models/repository';

@Module({
  services: [Repository],
  exports: [Repository]
})
export class DbModule {}