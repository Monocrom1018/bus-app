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

  @IsNumber()
  @ApiProperty()
  people: number;

  @IsNumber()
  @ApiProperty()
  totalCharge: number;

  @IsNumber()
  @ApiProperty()
  totalDistance: number;
}
