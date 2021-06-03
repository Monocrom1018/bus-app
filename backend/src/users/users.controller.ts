import { UserUpdateDto } from './dto/user-update.dto';
import {
  Body,
  Post,
  Get,
  Controller,
  UploadedFile,
  UseInterceptors,
  Res,
  Response,
  Request,
  Param,
  ValidationPipe,
  ParseIntPipe,
  Header,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import path = require('path');
import { paramsToFormData } from 'admin-bro';

export const storage = {
  storage: diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images');
    },
    filename: (req, file, cb) => {
      console.log(file);
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
  constructor(private userService: UsersService) {}

  @Post('update')
  @UseInterceptors(FileInterceptor('user[profile_img]', storage)) // formData의 key값
  async update(
    // @Body('user', ValidationPipe) userUpdateDto: UserUpdateDto,
    @Body('user') userUpdateDto: UserUpdateDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    console.log(file);
    return this.userService.update(file.filename, userUpdateDto);
  }

  @Get('getInformation')
  async getInformation() {
    return this.userService.getInformation();
  }
}
