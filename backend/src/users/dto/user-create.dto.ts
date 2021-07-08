import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDto {
  @IsString()
  @MinLength(4)
  @MaxLength(80)
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(80)
  @ApiProperty()
  password: string;

  @IsString()
  @ApiProperty()
  user_type: string;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  company_name: string;

  @IsBoolean()
  @ApiProperty()
  termCheck;

  @IsBoolean()
  @ApiProperty()
  privacyCheck;

  @IsBoolean()
  @ApiProperty()
  marketingCheck;
}
