import {Module} from '@astra/common';
import {injectable} from 'inversify';
import {StoragesController} from './storages.controller';

@Module({
    controllers: [StoragesController]
})
@injectable()
export class StoragesModule {}