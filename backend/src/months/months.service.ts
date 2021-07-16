import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MonthsRepository } from '@months/months.repogitory';

@Injectable()
export class MonthsService {
  constructor(
    @InjectRepository(MonthsRepository)
    private monthsRepository: MonthsRepository,
  ) {}

  async isPeakMonth(month) {
    return await this.monthsRepository.checkPeak(month);
  }
}
