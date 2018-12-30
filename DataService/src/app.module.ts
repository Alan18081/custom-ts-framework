import {Module} from '@astra/common';
import { StorageDataModule } from './components/storage-data/storage-data.module';

@Module({
  imports: [StorageDataModule],
})
export class AppModule {}