import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Months as Month } from '@months/months.entity';

@EntityRepository(Month)
export class MonthsRepository extends Repository<Month> {
  async checkPeak(month) {
    const targetMonth = await this.findOne({
      where: { month: month },
    });
    return targetMonth.peak;
  }
}
