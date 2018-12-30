import { Module } from '@astra/common';
import { StoragesHandler } from './storages.handler';
import { StoragesService } from './storages.service';
import {StoragesRepository} from './storages.repository';
import {ProjectsModule} from '../projects/projects.module';

@Module({
  imports: [ProjectsModule],
  handlers: [StoragesHandler],
  services: [StoragesService, StoragesRepository],
})
export class StoragesModule {}