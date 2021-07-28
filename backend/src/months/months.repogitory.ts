import { EntityRepository, Repository } from 'typeorm';
import { Months as Month } from '@months/months.entity';

@EntityRepository(Month)
export class MonthsRepository extends Repository<Month> {
  async checkPeak(month: string) {
    const targetMonth = await this.findOne({
      where: { month },
    });
    return targetMonth.peak;
  }
}
