import { IsNumber, IsPositive, IsString, Length } from 'class-validator';

export class QuoteCreatorDto {
  @IsString({message:'El atributo from debe ser un texto'})
  @Length(2, 5, {message: 'El atributo "From" debe contener entre 2 y 5 caracteres'})
  from: string;

  @IsString({message: 'El atributo "to"  debe ser un texto'})
  @Length(2, 5, {message: 'El atributo "to" debe contener entre 2 y 5 caracteres'})
  to: string;

  @IsNumber({}, {message: 'Amount debe ser un numero'})
  @IsPositive({message: 'Amount debe ser un numero positivo'})
  amount: number;
}