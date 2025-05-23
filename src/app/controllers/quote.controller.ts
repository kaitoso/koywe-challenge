import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { QuoteFacade } from '../../context/quote/application/facade/quote.facade';
import { JwtAuthGuard } from '../../shared/infrastructure/guards/jwt-auth.guard';
import { QuoteCreatorDto } from 'src/context/quote/application/dto/quote-creator.dto';

@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteFacade: QuoteFacade) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: QuoteCreatorDto) {
    const { from, to, amount } = body;
    const quote = await this.quoteFacade.createQuote(from, to, amount);
    return quote;
  }
  
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async find(@Param('id') id: string) {
    return this.quoteFacade.findQuote(id);
  }

}
