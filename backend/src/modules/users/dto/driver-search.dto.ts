import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray } from 'class-validator';

export class DriverSearchDto {
  @IsString()
  @ApiProperty({
    example: 'Sun Jun 06 2021 09:07:00 GMT+0900 (대한민국 표준시)',
  })
  departureDate?: string;

  @IsString()
  @IsOptional()
  departureTime?: string;

  @IsString()
  @ApiProperty({
    example: 'Sun Jun 06 2021 09:07:00 GMT+0900 (대한민국 표준시)',
  })
  returnDate?: string;

  @IsString()
  @IsOptional()
  returnTime?: string;

  @IsArray()
  @IsOptional()
  @ApiProperty()
  schedule?: Array<{ [key: string]: string | number }>;
}
