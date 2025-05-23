import { Injectable } from '@nestjs/common';
import { QuoteRepository } from '../../domain/contracts/quote.repository';
import { Quote } from '../../domain/class/quote';
import { PrismaService } from '../../../../shared/infrastructure/prisma/prisma.service';

@Injectable()
export class PrismaQuoteRepository implements QuoteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(quote: Quote): Promise<void> {
    await this.prisma.quote.create({
      data: {
        id: quote.id,
        from: quote.from,
        to: quote.to,
        amount: quote.amount,
        rate: quote.rate,
        convertedAmount: quote.convertedAmount,
        timestamp: quote.timestamp,
        expiresAt: quote.expiresAt,
      },
    });
  }

  async findById(id: string): Promise<Quote | null> {
    const data = await this.prisma.quote.findUnique({ where: { id } });
    if (!data) return null;

    return new Quote(
      data.id,
      data.from,
      data.to,
      data.amount,
      data.rate,
      data.convertedAmount,
      data.timestamp,
      data.expiresAt,
    );
  }
}
