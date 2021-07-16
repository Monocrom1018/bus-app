import {
  Body,
  Controller,
  Get,
  Post,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReservationCreateDto } from './dto/create-reservation.dto';
import { ReservationsService } from './reservations.service';

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
  // form-data 형식으로 post 요청할 경우에 FileInterceptor 설정이 없으면
  // 전달받은 데이터의 내용을 인식하지 못합니다.
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body('reservation') reservationCreateDto: ReservationCreateDto,
  ) {
    return this.reservationsService.create(reservationCreateDto);
  }

  @ApiOperation({ summary: '예약요청 수락, 거절 또는 취소' })
  @Post('update')
  @ApiResponse({
    status: 200,
    description: 'confirm or refusal success',
  })
  async updateReservation(@Body() param: any) {
    return this.reservationsService.updateReservation(param);
  }

  @ApiOperation({ summary: '예약목록 가져오기' })
  @Get()
  @ApiResponse({
    status: 200,
    description: 'get all Reservations success',
  })
  async getAllFromUser(
    @Query('email') email: string,
    @Query('page') page: number,
  ) {
    return this.reservationsService.getAllFromUser(email, page);
  }
}
