import { DateAuditEntity } from '@entities/date-audit.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UsersChatroomsEntity } from 'src/modules/users-chatrooms/user-chatrooms.entity';
import { ChatRoomType } from './enum';

@Entity('chatrooms')
export class ChatroomsEntity extends DateAuditEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ type: 'enum', enum: ChatRoomType, default: ChatRoomType.Single })
  chat_room_type: ChatRoomType;

  @OneToMany(
    (type) => UsersChatroomsEntity,
    (userChatrooms) => userChatrooms.chatroom,
  )
  userChatrooms: UsersChatroomsEntity[];
}
