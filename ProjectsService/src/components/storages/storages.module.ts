import { Module } from '@astra/common';
import { CoreModule } from '../core/core.module';
import { StoragesHandler } from './storages.handler';
import { StoragesService } from './storages.service';

@Module({
  imports: [CoreModule],
  handlers: [StoragesHandler],
  services: [StoragesService]
})
export class StoragesModule {}