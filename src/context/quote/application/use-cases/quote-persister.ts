import { Inject, Injectable } from '@nestjs/common';
import { Quote } from '../../domain/class/quote';
import { QuoteRepository } from '../../domain/contracts/quote.repository';

@Injectable()
export class QuotePersister {
  constructor(
    @Inject('QuoteRepository')
    private readonly quoteRepository: QuoteRepository,
  ) {}

  async run(quote: Quote): Promise<void> {
    await this.quoteRepository.save(quote);
  }
}
