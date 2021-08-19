import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessagesRepository } from './messages.repository';
import { MessagesEntity } from './messages.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessagesRepository)
    private messagesRepository: MessagesRepository,
  ) {}
}
