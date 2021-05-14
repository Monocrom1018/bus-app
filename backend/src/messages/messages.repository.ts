import { EntityRepository, Repository } from 'typeorm';
import { Messages as Message } from './entities/message.entity';

@EntityRepository(Message)
export class MessagesRepository extends Repository<Message> {}
