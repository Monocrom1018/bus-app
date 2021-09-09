import { EntityRepository, Repository } from 'typeorm';
import { MonthsEntity } from 'src/modules/months/months.entity';

@EntityRepository(MonthsEntity)
export class MonthsRepository extends Repository<MonthsEntity> {
  async checkPeak(month: string) {
    const targetMonth = await this.findOne({
      where: { month },
    });

    return targetMonth.peak;
  }

  async getAll(): Promise<MonthsEntity[]> {
    const months = await this.find({
      order: {
        createdAt: 'ASC',
      },
    });
    return months;
  }
}
