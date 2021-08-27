import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersChatroomsRepository } from './user-chatrooms.repository';
import { ChatroomsRepository } from '../chatrooms/chatrooms.repository';
import { UsersChatroomsService } from './user-chatrooms.service';
import { UsersChatroomsController } from './user-chatrooms.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatroomsRepository, UsersChatroomsRepository]),
  ],
  controllers: [UsersChatroomsController],
  providers: [UsersChatroomsService],
})
export class UsersChatroomsModule {}
