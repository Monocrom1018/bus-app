import { EntityRepository, Repository } from 'typeorm';
import { Notices as Notice } from './notices.entity';

@EntityRepository(Notice)
export class NoticesRepository extends Repository<Notice> {
  async getAll(): Promise<Notice[]> {
    const notices = await this.find({
      order: {
        createdAt: 'ASC',
      },
    });
    return notices;
  }

  async getOne(id: number): Promise<Notice> {
    const notice = await this.findOne({ where: { id } });
    return notice;
  }
}
