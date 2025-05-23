import { Injectable } from '@nestjs/common';
import { QuoteCreator } from '../use-cases/quote-creator';
import { QuotePersister } from '../use-cases/quote-persister';
import { Quote } from '../../domain/class/quote';
import { QuoteGetter } from '../use-cases/quote-getter';

@Injectable()
export class QuoteFacade {
  constructor(
    private readonly quoteCreator: QuoteCreator,
    private readonly quotePersister: QuotePersister,
    private readonly quoteGetter: QuoteGetter,
  ) {}

  async createQuote(from: string, to: string, amount: number): Promise<Quote> {
    const quote = await this.quoteCreator.run(from, to, amount);
    await this.quotePersister.run(quote);
    return quote;
  }

  async findQuote(id: string): Promise<Quote> {
    return this.quoteGetter.run(id);
  }
}
