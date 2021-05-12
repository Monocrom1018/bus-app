import { Injectable } from '@nestjs/common';
import { FaqsRepository } from './faqs.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Faqs as Faq } from './entities/faq.entity';

@Injectable()
export class FaqsService {
  constructor(
    @InjectRepository(FaqsRepository)
    private faqsRepository: FaqsRepository,
  ) {}

  async getAll(): Promise<Faq[]> {
    const faqs = this.faqsRepository.getAll();
    return faqs;
  }
}
