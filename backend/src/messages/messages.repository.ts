import { EntityRepository, Repository } from 'typeorm';
import { Messages as Message } from './messages.entity';

@EntityRepository(Message)
export class MessagesRepository extends Repository<Message> {}
