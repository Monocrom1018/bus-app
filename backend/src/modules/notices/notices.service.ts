import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoticesRepository } from './notices.repository';
import { NoticesEntity } from './notices.entity';

@Injectable()
export class NoticesService {
  constructor(
    @InjectRepository(NoticesRepository)
    private noticesRepository: NoticesRepository,
  ) {}

  async getAll(): Promise<NoticesEntity[]> {
    const notices = await this.noticesRepository.getAll();
    return notices;
  }

  async getOne(id: number): Promise<NoticesEntity> {
    const notice = this.noticesRepository.getOne(id);
    return notice;
  }

  async deleteOne(id: number): Promise<boolean> {
    try {
      await this.noticesRepository.delete(id);
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }
}
