import { Injectable } from '@nestjs/common';
import { ChatroomsRepository } from '@chatrooms/chatrooms.repository';
import { AuthService } from '@auth/auth.service';
import { UsersChatroomsRepository } from './user-chatrooms.repository';
import { CreateUserChatroomDto } from './dto/create-user-chatroom.dto';

@Injectable()
export class UsersChatroomsService {
  constructor(
    private readonly chatroomsRepository: ChatroomsRepository,
    private readonly usersChatroomsRepository: UsersChatroomsRepository,
    private readonly authService: AuthService,
  ) {}

  async create(
    createUserChatroomDto: CreateUserChatroomDto,
    chatroomId: number,
  ) {
    try {
      const user = await this.authService.currentApiUser();

      const chatroom = await this.chatroomsRepository.findOne({
        where: { id: chatroomId },
      });

      const userChatroom = this.usersChatroomsRepository.create({
        ...createUserChatroomDto,
        chatroom,
        user,
      });
    } catch (error) {
      return error;
    }

    return 'ok';
  }
}
