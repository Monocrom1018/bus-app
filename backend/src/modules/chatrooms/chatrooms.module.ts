import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatroomsRepository } from './chatrooms.repository';
import { ChatroomsService } from './chatrooms.service';
import { ChatroomsController } from './chatrooms.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ChatroomsRepository])],
  controllers: [ChatroomsController],
  providers: [ChatroomsService],
})
export class ChatroomsModule {}
