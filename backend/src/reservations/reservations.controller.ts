import { Body, Controller, Post } from '@nestjs/common';
import { ReservationsService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post('create')
  async create(@Body() params) {
    return this.reservationsService.create(params);
  }
}
