import { EntityRepository, Repository } from 'typeorm';
import { UsersChatroomsEntity } from './user-chatrooms.entity';

@EntityRepository(UsersChatroomsEntity)
export class UsersChatroomsRepository extends Repository<UsersChatroomsEntity> {}
