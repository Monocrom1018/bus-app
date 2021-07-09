import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsArray } from 'class-validator';

export class UserSearchDto {
  @IsString()
  @ApiProperty()
  departure: string;

  @IsString()
  @ApiProperty({
    example: 'Sun Jun 06 2021 09:07:00 GMT+0900 (대한민국 표준시)',
  })
  departureDate: string;

  @IsString()
  @ApiProperty()
  destination: string;

  @IsArray()
  @IsOptional()
  @ApiProperty()
  stopovers: string[];

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  distance: number;
}
