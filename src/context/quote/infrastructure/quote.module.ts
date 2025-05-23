import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CryptoMktQuoteRateProvider } from './providers/cryptomkt-quote-rate.provider';
import { PrismaQuoteRepository } from './repository/prisma-quote.repository';


import { QuoteFacade } from '../application/facade/quote.facade';
import { QuoteCreator } from '../application/use-cases/quote-creator';
import { QuotePersister } from '../application/use-cases/quote-persister';
import { QuoteGetter } from '../application/use-cases/quote-getter';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'QuoteRateProvider',
      useClass: CryptoMktQuoteRateProvider,
    },
    {
      provide: 'QuoteRepository',
      useClass: PrismaQuoteRepository,
    },

    QuoteCreator,
    QuotePersister,
    QuoteGetter,
    QuoteFacade,
  ],
  exports: [QuoteFacade],
})
export class QuoteModule {}
