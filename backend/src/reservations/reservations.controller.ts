import { Body, Controller, Get, Post, Param, Patch } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ReservationsService } from './reservations.service';
import { ReservationCreateDto } from './dto/create-reservation.dto';

@ApiTags('예약')
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}
  @ApiOperation({ summary: '예약 생성' })
  @Post('create')
  @ApiResponse({
    status: 200,
    description: 'create Reservation success',
  })
  async create(@Body() reservationCreateDto: ReservationCreateDto) {
    return this.reservationsService.create(reservationCreateDto);
  }

  @ApiOperation({ summary: '예약요청 수락, 거절 또는 취소' })
  @Post('update')
  @ApiResponse({
    status: 200,
    description: 'confirm or refusal success',
  })
  async updateReservation(@Body() param) {
    return this.reservationsService.updateReservation(param);
  }

  @ApiOperation({ summary: '예약목록 가져오기' })
  @Get(':email')
  @ApiResponse({
    status: 200,
    description: 'get all Reservations success',
  })
  @ApiParam({
    name: 'email',
    required: true,
    type: 'string',
  })
  async getAllFromUser(@Param('email') param: string) {
    return this.reservationsService.getAllFromUser(param);
  }
}
