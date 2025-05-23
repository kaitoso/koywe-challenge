export interface QuoteRateProvider {
    getRate(from: string, to: string): Promise<number>;
  }