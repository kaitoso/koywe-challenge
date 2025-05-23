import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @ApiProperty({ example: 'testuser', description: 'Nombre de usuario único' })
  @IsString({ message: 'El nombre de usuario debe ser un texto.' })
  @IsNotEmpty({ message: 'El Nombre de usuario no debe estar vacío.' })
  username: string;

  @ApiProperty({ example: 'securePassword', description: 'Contraseña con mínimo 4 caracteres' })
  @IsString({ message: 'La contraseña del usuario debe ser un texto.' })
  @MinLength(4, { message: 'La contraseña debe contener al menos 4 digitos.' })
  password: string;
}