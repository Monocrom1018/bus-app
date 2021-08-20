import {
  Body,
  Controller,
  Get,
  Post,
  UseInterceptors,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ScheduleCreateDto } from './dto/create-schedule.dto';
import { SchedulesService } from './schedules.service';

@ApiTags('예약')
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @ApiOperation({ summary: '일정 생성' })
  @Post('create')
  @ApiResponse({
    status: 200,
    description: 'create schedules success',
  })
  // form-data 형식으로 post 요청할 경우에 FileInterceptor 설정이 없으면
  // 전달받은 데이터의 내용을 인식하지 못합니다.
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body() scheduleCreateDto: any) {
    return this.schedulesService.create(scheduleCreateDto);
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
    @Query('destination') destination: string,
    @Query('stopOvers') stopOvers: { id?: string; region?: string }[],
  ) {
    if (!departure || !destination) {
      throw new BadRequestException('empty data exist');
    }

    const data = await this.schedulesService.getDistance({
      departure,
      destination,
      stopOvers,
    });

    return data;
  }
}
