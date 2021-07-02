import { LoggedInGuard } from './../auth/guards/logged-in.guard';
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserCreateDto } from './dto/user-create.dto';
import { UserSearchDto } from './dto/user-search.dto';
import {
  Body,
  Post,
  Get,
  Controller,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path = require('path');
import { NotLoggedInGuard } from '@auth/guards/not-logged-in.guard';

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
@ApiTags('유저')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: '회원가입' })
  @Post('/signup')
  @ApiResponse({
    status: 200,
    description: 'create User success',
  })
  @UseInterceptors(FileInterceptor('file'))
  async signUp(@Body() userCreateDto: UserCreateDto) {
    console.log(userCreateDto);
    await this.usersService.signUp(userCreateDto);
    return 'user saved';
  }

  @ApiOperation({ summary: '유저정보 변경' })
  @UseGuards(LoggedInGuard)
  @Post('update')
  @ApiResponse({
    status: 200,
    description: 'update User success',
  })
  @UseInterceptors(FileInterceptor('user[profile_img]', storage)) // formData의 key값
  async update(
    @Body() userUpdateDto: UserUpdateDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const filename = file?.path || '';
    return this.usersService.update(filename, userUpdateDto);
  }

  @ApiOperation({ summary: '접속중인 유저정보 가져오기' })
  @Get('me/:email')
  @ApiResponse({
    status: 200,
    description: 'get current user data success',
  })
  @ApiParam({
    name: 'email',
    required: true,
    type: 'string',
  })
  async me(@Param('email') param: string) {
    return this.usersService.me(param);
  }

  @ApiOperation({ summary: '기사 검색' })
  @Post('drivers')
  @ApiResponse({
    status: 200,
    description: 'get an array of matching drivers success',
  })
  async getDrivers(@Body() userSearchDto: UserSearchDto) {
    return this.usersService.getDrivers(userSearchDto);
  }

  @ApiOperation({ summary: '단일기사 정보 가져오기' })
  @ApiResponse({
    status: 200,
    description: 'get one target driver success',
  })
  @Get('driver/:id')
  async getOneDriver(@Param('id') id: number) {
    return this.usersService.getOneDriver(id);
  }
}
