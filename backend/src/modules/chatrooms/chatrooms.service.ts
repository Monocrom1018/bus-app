import { Injectable } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { CreateChatroomDto } from './dto/create-chatroom.dto';
import { UpdateChatroomDto } from './dto/update-chatroom.dto';
import { ChatroomsRepository } from './chatrooms.repository';

@Injectable()
export class ChatroomsService {
  constructor(
    private readonly chatroomsRepository: ChatroomsRepository,
    private readonly authService: AuthService,
  ) {}

  async create(createChatroomDto: CreateChatroomDto) {
    const chatroom = this.chatroomsRepository.create({
      ...createChatroomDto,
    });
    return chatroom;
  }

  async single() {
    const user = await this.authService.currentApiUser();
    const chatroom = await this.chatroomsRepository.single(user);

    if (chatroom) {
      return chatroom;
    }

    return null;
  }

  async index() {
    const user = await this.authService.currentApiUser();
    const chatrooms = await this.chatroomsRepository.index(user);
    return chatrooms;
  }

  async show(id: number) {
    const chatroom = await this.chatroomsRepository.show(id);
    return chatroom;
  }

  update(id: number, updateChatroomDto: UpdateChatroomDto) {
    return `This action updates a #${id} chatroom`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatroom`;
  }
}
