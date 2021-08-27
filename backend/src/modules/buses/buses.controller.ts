import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { BusesService } from './buses.service';

@ApiTags('Bus')
@Controller('buses')
export class BusesController {
  constructor(private readonly busesService: BusesService) {}
  
}
