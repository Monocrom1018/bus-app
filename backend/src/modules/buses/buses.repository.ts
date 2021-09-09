import { EntityRepository, Repository } from 'typeorm';
import { BusesEntity } from './buses.entity';

@EntityRepository(BusesEntity)
export class BusesRepository extends Repository<BusesEntity> {}
