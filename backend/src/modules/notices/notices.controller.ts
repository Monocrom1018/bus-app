import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { Controller, Delete, Get, Param } from '@nestjs/common';
import { NoticesService } from './notices.service';

@ApiTags('공지사항')
@Controller('notices')
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  @ApiOperation({ summary: '모든 공지사항 가져오기' })
  @Get()
  getAll() {
    return this.noticesService.getAll();
  }

  @ApiOperation({ summary: '단일 공지사항 가져오기' })
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.noticesService.getOne(id);
  }

  @ApiOperation({ summary: '단일 공지사항 삭제하기' })
  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    return this.noticesService.deleteOne(id);
  }
}
