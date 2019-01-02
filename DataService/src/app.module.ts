import {Module} from '@astra/common';
import { StorageRecordsModule } from './components/storage-records/storage-records.module';

@Module({
  imports: [StorageRecordsModule],
})
export class AppModule {}