import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { ReservationsService } from './reservations.service';

@ApiTags('예약')
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}
  @ApiOperation({ summary: '예약 생성' })
  @Post('create')
  @ApiResponse({
    status: 200,
    description: 'Reservation created',
  })
  async create(@Body() params) {
    return this.reservationsService.create(params);
  }
}
