import { IsString, MinLength, MaxLength } from 'class-validator';

export class UserCreateDto {
  @IsString()
  @MinLength(4)
  @MaxLength(80)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(80)
  password: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password_confirmation: string;

  @IsString()
  name: string;
}
