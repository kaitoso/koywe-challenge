import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Quote } from '../../domain/class/quote';
import { QuoteRepository } from '../../domain/contracts/quote.repository';

@Injectable()
export class QuoteGetter {
  constructor(
    @Inject('QuoteRepository')
    private readonly quoteRepository: QuoteRepository,
  ) {}

  async run(id: string): Promise<Quote> {
    const quote = await this.quoteRepository.findById(id);
    if (!quote) {
      throw new NotFoundException(`Cotización con ID ${id} no encontrada`);
    }

    const now = new Date();
    if (quote.expiresAt < now) {
      throw new NotFoundException(`La cotización con ID ${id} ha expirado`);
    }

    return quote;
  }
}