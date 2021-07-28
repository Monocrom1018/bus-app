import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MonthsRepository } from '@months/months.repository';

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
