import { JwkStrategy } from './../auth/strategies/jwk.strategy';
import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { MonthsService } from '@months/months.service';

@Controller('months')
export class MonthsController {
  constructor(private readonly monthsService: MonthsService) {}
}
