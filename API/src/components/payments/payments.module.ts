import { Module } from '@astra/common';
import { AuthModule } from '../auth/auth.module';
import { PaymentsController } from './payments.controller';

@Module({
  imports: [AuthModule],
  controllers: [PaymentsController]
})
export class PaymentsModule {}