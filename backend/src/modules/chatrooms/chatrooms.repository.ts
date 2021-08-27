import { EntityRepository, getRepository, Repository } from 'typeorm';
import { UsersChatroomsEntity } from '@users-chatrooms/user-chatrooms.entity';
import { UsersEntity } from '@users/users.entity';
import { ChatroomsEntity } from './chatrooms.entity';

@EntityRepository(ChatroomsEntity)
export class ChatroomsRepository extends Repository<ChatroomsEntity> {
  async single(user: UsersEntity) {
    const chatroom = await getRepository(UsersEntity)
      .createQueryBuilder('users')
      .leftJoin(
        UsersChatroomsEntity,
        'users_chatrooms',
        'users.id = users_chatrooms.userId',
      )
      .leftJoinAndSelect(
        ChatroomsEntity,
        'chatrooms',
        'users_chatrooms.chatroomId = chatrooms.id',
      )
      .where('users.id = :id', { id: user.id })
      .andWhere('users_chatrooms.userId = :id', { id: user.id })
      .andWhere('chatrooms.chat_room_type = :chat_room_type', {
        chat_room_type: 'single',
      })
      .getOne();

    return chatroom;
  }

  async index(user: UsersEntity) {
    const chatrooms = await getRepository(UsersEntity)
      .createQueryBuilder('users')
      .leftJoin(
        UsersChatroomsEntity,
        'users_chatrooms',
        'users.id = users_chatrooms.userId',
      )
      .leftJoinAndSelect(
        ChatroomsEntity,
        'chatrooms',
        'users_chatrooms.chatroomId = chatrooms.id',
      )
      .getMany();

    return chatrooms;
  }

  async show(id: number) {
    const chatroom = await getRepository(ChatroomsEntity)
      .createQueryBuilder('chatrooms')
      .leftJoin(
        UsersChatroomsEntity,
        'users_chatrooms',
        'users_chatrooms.chatroomId = chatrooms.id',
      )
      .leftJoinAndSelect(
        UsersEntity,
        'users',
        'users_chatrooms.userId = users.id',
      )
      .where('chatrooms.id = :id', { id })
      .getOne();
    return chatroom;
  }
}
