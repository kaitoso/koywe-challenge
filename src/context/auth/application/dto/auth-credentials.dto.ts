import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString({ message: 'El nombre de usuario debe ser un texto.' })
  @IsNotEmpty({ message: 'El Nombre de usuario no debe estar vacío.' })
  username: string;

  @IsString({ message: 'La contraseña del usuario debe ser un texto.' })
  @MinLength(4, { message: 'La contraseña debe contener al menos 4 digitos.' })
  password: string;
}