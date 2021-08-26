import { DateAuditEntity } from '@entities/date-audit.entity';
import { UsersEntity } from '@users/users.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ChatroomsEntity } from '@chatrooms/chatrooms.entity';

@Entity('users_chatrooms')
export class UsersChatroomsEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => ChatroomsEntity, (chatroom) => chatroom.userChatrooms)
  chatroom: ChatroomsEntity;

  @ManyToOne((type) => UsersEntity, (user) => user.usersChatRooms)
  user: UsersEntity;
}
