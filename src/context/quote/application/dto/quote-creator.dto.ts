import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString, Length } from 'class-validator';

export class QuoteCreatorDto {
  @ApiProperty({
    example: 'ARS',
    description: 'Moneda de origen',
  })
  @IsString({message:'El atributo from debe ser un texto'})
  @Length(2, 5, {message: 'El atributo "From" debe contener entre 2 y 5 caracteres'})
  from: string;

  @ApiProperty({
    example: 'ETH',
    description: 'Moneda de destino',
  })
  @IsString({message: 'El atributo "to"  debe ser un texto'})
  @Length(2, 5, {message: 'El atributo "to" debe contener entre 2 y 5 caracteres'})
  to: string;

  @ApiProperty({ example: 1000000, description: 'Monto a convertir' })
  @IsNumber({}, {message: 'Amount debe ser un numero'})
  @IsPositive({message: 'Amount debe ser un numero positivo'})
  amount: number;
}