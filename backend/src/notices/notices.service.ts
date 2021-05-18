import { NoticesRepository } from './notices.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notices as Notice } from './entities/notice.entity';
@Injectable()
export class NoticesService {
  constructor(
    @InjectRepository(NoticesRepository)
    private noticesRepository: NoticesRepository,
  ) {}

  async getAll(): Promise<Notice[]>{
    const notices = this.noticesRepository.getAll();
    return notices;
  }

  async getOne(id: number): Promise<Notice> {
    const notice = this.noticesRepository.getOne(id);
    return notice;
  }
}
