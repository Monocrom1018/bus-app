import { EntityRepository, Repository } from 'typeorm';
import { NoticesEntity } from './notices.entity';

@EntityRepository(NoticesEntity)
export class NoticesRepository extends Repository<NoticesEntity> {
  async getAll(): Promise<NoticesEntity[]> {
    const notices = await this.find({
      order: {
        createdAt: 'ASC',
      },
    });
    return notices;
  }

  async getOne(id: number): Promise<NoticesEntity> {
    const notice = await this.findOne({ where: { id } });
    return notice;
  }
}
