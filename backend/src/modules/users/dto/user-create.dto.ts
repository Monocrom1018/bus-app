import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsArray,
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
  company: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  company_name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  director_name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  director_email: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  director_phone: number;

  @IsBoolean()
  @ApiProperty()
  termCheck;

  @IsBoolean()
  @ApiProperty()
  privacyCheck;

  @IsBoolean()
  @ApiProperty()
  marketingCheck;

  @IsOptional()
  @IsArray()
  @ApiProperty()
  files: Array<any>;
}
