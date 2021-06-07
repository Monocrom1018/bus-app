import { UserUpdateDto } from './dto/user-update.dto';
import { UserCreateDto } from './dto/user-create.dto';
import {
  Body,
  Post,
  Get,
  Controller,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path = require('path');

export const storage = {
  storage: diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images');
    },
    filename: (req, file, cb) => {
      const filename: string = path
        .parse(file.originalname)
        .name.replace(/\s/g, '');
      const extension: string = path.parse(file.originalname).ext;
      cb(null, `${filename}-${Date.now()}${extension}`);
    },
  }),
};

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  @UseInterceptors(FileInterceptor('user[license]', storage))
  async signUp(
    @Body('user') userCreateDto: UserCreateDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    await this.usersService.signUp(userCreateDto);
    return 'user saved';
  }

  @Post('update')
  @UseInterceptors(FileInterceptor('user[profile_img]', storage)) // formData의 key값
  async update(
    @Body('user') userUpdateDto: UserUpdateDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usersService.update(file.path, userUpdateDto);
  }

  @Get('me')
  async me() {
    return this.usersService.me();
  }
}
