import { Body, Controller, Get, Post, Param } from '@nestjs/common';
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

  @Get(':email')
  async getAllFromUser(@Param() email) {
    console.log('레저컨 도착', email);
    return this.reservationsService.getAllFromUser(email.email);
  }
}
