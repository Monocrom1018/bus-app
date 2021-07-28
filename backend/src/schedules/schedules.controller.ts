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
import { ScheduleCreateDto } from './dto/create-schedule.dto';
import { SchedulesService } from './schedules.service';

@ApiTags('예약')
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @ApiOperation({ summary: '예약 생성' })
  @Post()
  @ApiResponse({
    status: 200,
    description: 'create Reservation success',
  })
  // form-data 형식으로 post 요청할 경우에 FileInterceptor 설정이 없으면
  // 전달받은 데이터의 내용을 인식하지 못합니다.
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body('schedule') reservationCreateDto: ScheduleCreateDto) {
    return this.schedulesService.create(reservationCreateDto);
  }

  // 거리 보내주는 api 짜기
  @ApiOperation({ summary: '거리산출' })
  @Get('distance')
  @ApiResponse({
    status: 200,
    description: 'get distance success',
  })
  async getDistance(
    @Query('departure') departure: string,
    @Query('stopovers') stopovers: string[],
    @Query('destination') destination: string,
    @Query('lastDestination') lastDestination: string,
  ) {
    return this.schedulesService.getDistance(
      departure,
      stopovers,
      destination,
      lastDestination,
    );
  }
}
