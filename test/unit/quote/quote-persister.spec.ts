import { QuotePersister } from '../../../src/context/quote/application/use-cases/quote-persister';
import { QuoteRepository } from '../../../src/context/quote/domain/contracts/quote.repository';
import { Quote } from '../../../src/context/quote/domain/class/quote';

describe('QuotePersister', () => {
  let persister: QuotePersister;
  let mockRepository: QuoteRepository;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
      findById: jest.fn(),
    };

    persister = new QuotePersister(mockRepository);
  });

  it('guardar quote', async () => {
    const quote = new Quote(
      'test-id',
      'USD',
      'ETH',
      100,
      0.002,
      0.2,
      new Date(),
      new Date(Date.now() + 5 * 60 * 1000),
    );

    await persister.run(quote);

    expect(mockRepository.save).toHaveBeenCalledWith(quote);
    expect(mockRepository.save).toHaveBeenCalledTimes(1);
  });
});
