import { UserUpdateDto } from './dto/user-update.dto';
import {
  Body,
  Post,
  Controller,
  UploadedFile,
  UseInterceptors,
  Res,
  Response,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/update')
  @UseInterceptors(FileInterceptor('file')) // formData의 key값
  async userUpdate(
    @Body() userUpdateDto: UserUpdateDto,
    @UploadedFile() file: Express.Multer.File,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log(response);
    console.log('1231');
    console.log(userUpdateDto);
    console.log('gggg');
    console.log(file);
  }
}
