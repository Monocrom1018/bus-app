import { EntityRepository, Repository } from 'typeorm';
import { BusesEntity } from './buses.entity';

@EntityRepository(BusesEntity)
export class BusesRepository extends Repository<BusesEntity> {
  // async updateBus(user, updateColumns) {
  // }
  // async getAll(): Promise<BusesEntity[]> {
  //   const buses = await this.find({
  //     order: {
  //       createdAt: 'ASC',
  //     },
  //   });
  //   return buses;
  // }
}
