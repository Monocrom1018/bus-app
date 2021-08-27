import { Controller, Post, Body, Param } from '@nestjs/common';
import { UsersChatroomsService } from './user-chatrooms.service';
import { CreateUserChatroomDto } from './dto/create-user-chatroom.dto';

@Controller('chatrooms/:id/user-chatrooms')
export class UsersChatroomsController {
  constructor(private readonly usersChatroomsService: UsersChatroomsService) {}

  @Post()
  create(
    @Body() createUserChatroomDto: CreateUserChatroomDto,
    @Param('chatroom_id') chatroomId: number,
  ) {
    return this.usersChatroomsService.create(createUserChatroomDto, chatroomId);
  }
}
