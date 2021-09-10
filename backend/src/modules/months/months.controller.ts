import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { MonthsService } from 'src/modules/months/months.service';

@Controller('months')
export class MonthsController {
  constructor(private readonly monthsService: MonthsService) {}

  @ApiOperation({ summary: '모든 month 가져오기' })
  @Get()
  getAll() {
    return this.monthsService.getAll();
  }

  @ApiOperation({ summary: '단일 month 가져오기' })
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.monthsService.getOne(id);
  }

  @ApiOperation({ summary: '단일 month 삭제하기' })
  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    return this.monthsService.deleteOne(id);
  }
}
