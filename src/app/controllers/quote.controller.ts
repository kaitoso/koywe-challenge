import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { QuoteFacade } from '../../context/quote/application/facade/quote.facade';
import { JwtAuthGuard } from '../../shared/infrastructure/guards/jwt-auth.guard';
import { QuoteCreatorDto } from 'src/context/quote/application/dto/quote-creator.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteFacade: QuoteFacade) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBody({
    description: 'Datos para crear un quote',
    type: QuoteCreatorDto,
    examples: {
      example1: {
        summary: 'CLP a BTC',
        value: {
          from: 'CLP',
          to: 'BTC',
          amount: 100000,
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Quote creado exitosamente',
    schema: {
      example: {
        id: '361b4d7f-04f0-478a-9a1e-904ca1dff7fc',
        from: 'ETH',
        to: 'ARS',
        amount: 1000000,
        rate: 2918016,
        convertedAmount: 2918016000000,
        timestamp: '2025-05-23T22:00:06.631Z',
        expiresAt: '2025-05-23T22:05:06.631Z',
      },
    },
  })
  async create(@Body() body: QuoteCreatorDto) {
    const { from, to, amount } = body;
    const quote = await this.quoteFacade.createQuote(from, to, amount);
    return quote;
  }
  
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Quote obtenido por ID',
    schema: {
      example: {
        id: '361b4d7f-04f0-478a-9a1e-904ca1dff7fc',
        from: 'ETH',
        to: 'ARS',
        amount: 1000000,
        rate: 2918016,
        convertedAmount: 2918016000000,
        timestamp: '2025-05-23T22:00:06.631Z',
        expiresAt: '2025-05-23T22:05:06.631Z',
      },
    },
  })
  async find(@Param('id') id: string) {
    return this.quoteFacade.findQuote(id);
  }

}
