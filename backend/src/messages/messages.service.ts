import { MessagesRepository } from './messages.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages as Message } from './entities/message.entity';
@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessagesRepository)
    private messagesRepository: MessagesRepository,
  ) {}
}
