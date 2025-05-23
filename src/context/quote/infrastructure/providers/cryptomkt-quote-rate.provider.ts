import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { QuoteRateProvider } from '../../domain/contracts/quote-rate.provider';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

type CurrencyResponse = Record<string, {
  currency: string;
  price: string;
  timestamp: string;
}>;


@Injectable()
export class CryptoMktQuoteRateProvider implements QuoteRateProvider {

  private readonly logger = new Logger(CryptoMktQuoteRateProvider.name);

  constructor(private readonly config: ConfigService){}

  async getRate(from: string, to: string): Promise<number> {
    try {
      const response = await axios.get(
        this.config.get<string>('CRYPTOMKT_API_URL'),
        {
          params: {
            from: from,
            to: to,
          },
        }
      );
      
     const [firstKey] = Object.keys(response.data as CurrencyResponse);
     const rate = Number(response.data[firstKey].price);
      return rate;
    } catch (error) {
      this.logger.error(`Error fetching rate from ${from} to ${to}`, error.stack,);
      throw new InternalServerErrorException('No se pudo obtener el rate');
    }
  }
}
