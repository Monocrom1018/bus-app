import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { FaqsService } from './faqs.service';

@ApiTags('FAQ')
@Controller('faqs')
export class FaqsController {
  constructor(private readonly faqsService: FaqsService) {}

  @ApiOperation({ summary: '모든 FAQ 가져오기' })
  @Get()
  @ApiResponse({
    status: 200,
    description: 'get all FAQs success',
  })
  getAll() {
    return this.faqsService.getAll();
  }
}
