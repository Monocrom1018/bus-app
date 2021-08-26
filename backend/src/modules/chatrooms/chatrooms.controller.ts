import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ChatroomsService } from './chatrooms.service';
import { CreateChatroomDto } from './dto/create-chatroom.dto';
import { UpdateChatroomDto } from './dto/update-chatroom.dto';

@Controller('chatrooms')
export class ChatroomsController {
  constructor(private readonly chatroomsService: ChatroomsService) {}

  @Post()
  create(@Body() createChatroomDto: CreateChatroomDto) {
    return this.chatroomsService.create(createChatroomDto);
  }

  @Get()
  index() {
    return this.chatroomsService.index();
  }

  @Get(':id')
  show(@Param('id') id: number) {
    return this.chatroomsService.show(id);
  }

  @Get('/single')
  single() {
    return this.chatroomsService.single();
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: number,
  //   @Body() updateChatroomDto: UpdateChatroomDto,
  // ) {
  //   return this.chatroomsService.update(id, updateChatroomDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: number) {
  //   return this.chatroomsService.remove(id);
  // }
}
