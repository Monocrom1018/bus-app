import { Body, Controller, Post } from '@nestjs/common';
import { ReservationsService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post('/distance')
  async getDistance(@Body() params) {
    return this.reservationsService.getDistance(params);
  }
}
