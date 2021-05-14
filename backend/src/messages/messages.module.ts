import { MessagesRepository } from './messages.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

@Module({
  imports: [TypeOrmModule.forFeature([MessagesRepository])],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
