import { IsString, IsOptional, IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReservationCreateDto {
  @IsString()
  @ApiProperty({
    description: 'Email of Passenger',
  })
  userEmail: string;

  @IsNumber()
  @ApiProperty({
    description: 'Id of Driver or Company',
  })
  driverId: number;

  @IsString()
  @ApiProperty()
  departure: string;

  @IsString()
  @ApiProperty({
    example: 'Sun Jun 10 2021 09:00:00 GMT+0900 (대한민국 표준시)',
  })
  returnDate: string;

  @IsString()
  @ApiProperty({
    example: 'Sun Jun 06 2021 09:00:00 GMT+0900 (대한민국 표준시)',
  })
  departureDate: string;

  @IsString()
  @ApiProperty()
  destination: string;

  @IsNumber()
  @ApiProperty()
  totalCharge: number;

  @IsArray()
  @IsOptional()
  @ApiProperty()
  stopoversArray: string[];

  @IsNumber()
  @ApiProperty()
  people: number;
}
