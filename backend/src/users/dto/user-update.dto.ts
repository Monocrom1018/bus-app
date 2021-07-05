import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsArray,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateDto {
  @IsOptional()
  @ApiProperty()
  profile_img: any;

  @IsString()
  @IsOptional()
  @ApiProperty()
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  password: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  password_confirmation: string;

  @IsArray()
  @IsOptional()
  @ApiProperty()
  drivableLegion: string[];

  @IsArray()
  @IsOptional()
  @ApiProperty()
  drivableDate: string[];

  @IsString()
  @IsOptional()
  @ApiProperty()
  company: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  busNumber: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  busType: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  busOld: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  peopleAvailable: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  introduce: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  basicCharge: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  basicKm: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  nightCharge: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  chargePerKm: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  nightBegin: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  nightEnd: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  chargePerDay: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  serviceCharge: number;
}
