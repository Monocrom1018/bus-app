import { IsString, IsOptional, IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ScheduleCreateDto {
  @IsString()
  @ApiProperty({
    example: 'Sun Jun 06 2021 09:00:00 GMT+0900 (대한민국 표준시)',
  })
  departureDate: string;

  @IsString()
  @ApiProperty({
    example: 'Sun Jun 10 2021 09:00:00 GMT+0900 (대한민국 표준시)',
  })
  returnDate: string;

  @IsString()
  @ApiProperty()
  departure: string;

  @IsString()
  @ApiProperty()
  destination: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  landing: string;

  @IsArray()
  @IsOptional()
  @ApiProperty()
  stopoversArray: string[];
}
