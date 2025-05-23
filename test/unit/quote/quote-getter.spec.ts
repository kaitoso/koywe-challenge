import { QuoteGetter } from '../../../src/context/quote/application/use-cases/quote-getter';
import { QuoteRepository } from '../../../src/context/quote/domain/contracts/quote.repository';
import { Quote } from '../../../src/context/quote/domain/class/quote';
import { NotFoundException } from '@nestjs/common';

describe('QuoteGetter', () => {
  let quoteGetter: QuoteGetter;
  let mockRepository: QuoteRepository;

  const now = new Date();
  const validQuote = new Quote(
    'jhweg123',
    'USD',
    'ETH',
    100,
    0.002,
    0.2,
    now,
    new Date(now.getTime() + 5 * 60 * 1000),);

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
      findById: jest.fn(),
    };

    quoteGetter = new QuoteGetter(mockRepository);
  });

  it('Quote válido si no ha expirado', async () => {
    (mockRepository.findById as jest.Mock).mockResolvedValue(validQuote);

    const result = await quoteGetter.run(validQuote.id);

    expect(result).toBe(validQuote);
    expect(mockRepository.findById).toHaveBeenCalledWith(validQuote.id);
  });

  it('NotFoundException si el quote no existe', async () => {
    (mockRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(quoteGetter.run('inexistente')).rejects.toThrow(NotFoundException);
  });

  it('NotFoundException si el quote ha expirado', async () => {
    const expiredQuote = new Quote(
      'exp-456',
      'USD',
      'ETH',
      100,
      0.002,
      0.2,
      new Date(Date.now() - 10 * 60 * 1000),
      new Date(Date.now() - 5 * 60 * 1000),
    );

    (mockRepository.findById as jest.Mock).mockResolvedValue(expiredQuote);

    await expect(quoteGetter.run('exp-456')).rejects.toThrow(NotFoundException);
  });
});
