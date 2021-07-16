import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FaqsRepository } from './faqs.repository';
import { Faqs as Faq } from './faqs.entity';

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
