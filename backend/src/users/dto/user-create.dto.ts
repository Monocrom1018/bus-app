import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsBoolean,
} from 'class-validator';

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
  user_type: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  company_name: string;

  @IsBoolean()
  termCheck;

  @IsBoolean()
  privacyCheck;

  @IsBoolean()
  marketingCheck;
}
