import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Quote } from '../../domain/class/quote';
import { QuoteRateProvider } from '../../domain/contracts/quote-rate.provider';

@Injectable()
export class QuoteCreator {
  constructor(
    @Inject('QuoteRateProvider')
    private readonly quoteRateProvider: QuoteRateProvider,
  ) {}

  async run(from: string, to: string, amount: number): Promise<Quote> {
    const rate = await this.quoteRateProvider.getRate(from, to);

    if (typeof rate !== 'number' || isNaN(rate)) {
        throw new Error(`Rate inválido recibido: ${rate}`);
      }
    const convertedAmount = amount * rate;
    const timestamp = new Date();
    const expiresAt = new Date(timestamp.getTime() + 5 * 60 * 1000);

    return new Quote(
      uuidv4(),
      from,
      to,
      amount,
      rate,
      convertedAmount,
      timestamp,
      expiresAt,
    );
  }
}
