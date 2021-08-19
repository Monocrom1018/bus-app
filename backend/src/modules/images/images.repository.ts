import { EntityRepository, Repository } from 'typeorm';
import { ImagesEntity } from './images.entity';

@EntityRepository(ImagesEntity)
export class ImagesRepository extends Repository<ImagesEntity> {}
