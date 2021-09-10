import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MonthsRepository } from 'src/modules/months/months.repository';

@Injectable()
export class MonthsService {
  constructor(
    @InjectRepository(MonthsRepository)
    private monthsRepository: MonthsRepository,
  ) {}

  async getAll() {
    const months = await this.monthsRepository.getAll();
    return months;
  }

  async getOne(id: number) {
    const month = await this.monthsRepository.findOne({
      where: {
        id,
      },
    });
    return month;
  }

  async deleteOne(id: number) {
    await this.monthsRepository.delete(id);
  }

  async isPeakMonth(month: string) {
    const isPeak = await this.monthsRepository.checkPeak(month);
    return isPeak;
  }
}
