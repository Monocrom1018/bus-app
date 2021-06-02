import { UserUpdateDto } from './dto/user-update.dto';
import {
  Body,
  Post,
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
    destination: './uploads',
    filename: (req, file, cb) => {
      const filename: string = path
        .parse(file.originalname)
        .name.replace(/\s/g, '');
      const extension: string = path.parse(file.originalname).ext;
      cb(null, `${filename}${extension}`);
    },
  }),
};

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('update')
  @UseInterceptors(FileInterceptor('user[profile_img]', storage))
  async userUpdate(
    @Body('user') userUpdateDto: UserUpdateDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    console.log(file);
    console.log(userUpdateDto);
  }
}
