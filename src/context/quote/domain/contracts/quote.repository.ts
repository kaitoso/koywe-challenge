import { Quote } from "../class/quote";

export interface QuoteRepository {
    save(quote: Quote): Promise<void>;
    findById(id: string): Promise<Quote | null>;
  }
  