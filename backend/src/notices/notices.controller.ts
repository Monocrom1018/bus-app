import { Controller, Get, Param } from '@nestjs/common';
import { NoticesService } from './notices.service';
@Controller('notices')
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  @Get()
  getAll() {
    return this.noticesService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.noticesService.getOne(id);
  }
}
