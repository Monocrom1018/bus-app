import { PartialType } from '@nestjs/swagger';
import { CreateUserChatroomDto } from './create-user-chatroom.dto';

export class UpdateUserChatroomDto extends PartialType(CreateUserChatroomDto) {}
