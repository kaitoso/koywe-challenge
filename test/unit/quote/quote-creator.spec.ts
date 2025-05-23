import { QuoteCreator } from '../../../src/context/quote/application/use-cases/quote-creator';
import { QuoteRateProvider } from '../../../src/context/quote/domain/contracts/quote-rate.provider';
import { Quote } from '../../../src/context/quote/domain/class/quote';

describe('QuoteCreator', () => {
  let quoteCreator: QuoteCreator;
  let mockRateProvider: QuoteRateProvider;

  beforeEach(() => {
    mockRateProvider = {
      getRate: jest.fn(),
    };

    quoteCreator = new QuoteCreator(mockRateProvider);
  });

  it('genera quote válido', async () => {
    
    const from = 'ARS';
    const to = 'ETH';
    const amount = 1000;
    const rate = 0.000002;

    (mockRateProvider.getRate as jest.Mock).mockResolvedValue(rate);

    const quote = await quoteCreator.run(from, to, amount);

    expect(quote).toBeInstanceOf(Quote);
    expect(quote.from).toBe(from);
    expect(quote.to).toBe(to);
    expect(quote.amount).toBe(amount);
    expect(quote.rate).toBe(rate);
    expect(quote.convertedAmount).toBeCloseTo(amount * rate);
    expect(quote.timestamp).toBeInstanceOf(Date);
    expect(quote.expiresAt.getTime()).toBeGreaterThan(quote.timestamp.getTime());
  });

  it('rate invalido', async () => {
    (mockRateProvider.getRate as jest.Mock).mockResolvedValue(NaN);

    await expect(quoteCreator.run('USD', 'BTC', 100))
      .rejects
      .toThrow('Rate inválido recibido: NaN');
  });
});
