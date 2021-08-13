import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MonthsRepository } from 'src/modules/months/months.repository';

@Injectable()
export class MonthsService {
  constructor(
    @InjectRepository(MonthsRepository)
    private monthsRepository: MonthsRepository,
  ) {}

  async isPeakMonth(month: string) {
    const isPeak = await this.monthsRepository.checkPeak(month);
    return isPeak;
  }
}
