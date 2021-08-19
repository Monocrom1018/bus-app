import { Controller } from '@nestjs/common';
import { MonthsService } from 'src/modules/months/months.service';

@Controller('months')
export class MonthsController {
  constructor(private readonly monthsService: MonthsService) {}
}
