import { Module } from '@nestjs/common';
import { QuoteController } from '../controllers/quote.controller';
import { QuoteModule } from '../../context/quote/infrastructure/quote.module';
import { SharedAuthModule } from '../../shared/infrastructure/modules/shared-auth.module';

@Module({
  imports: [QuoteModule, SharedAuthModule],
  controllers: [QuoteController],
})
export class QuoteControllerModule {}
