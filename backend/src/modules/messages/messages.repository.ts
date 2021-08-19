import { EntityRepository, Repository } from 'typeorm';
import { MessagesEntity } from './messages.entity';

@EntityRepository(MessagesEntity)
export class MessagesRepository extends Repository<MessagesEntity> {}
