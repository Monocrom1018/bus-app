import { ApiOperation, ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
import {
  Body,
  Post,
  Get,
  Controller,
  UploadedFile,
  UseInterceptors,
  Param,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';
import { BillingKeyProps, TotalChargeProps } from '@interfaces/index';
import { UsersService } from './users.service';
import { UserSearchDto } from './dto/user-search.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserCreateDto } from './dto/user-create.dto';

export const storage = {
  storage: diskStorage({
    destination(req, file, cb) {
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
    await this.usersService.signUp(userCreateDto);
    return 'user saved';
  }

  @ApiOperation({ summary: '유저정보 변경' })
  @Post('update')
  @ApiResponse({
    status: 200,
    description: 'update User success',
  })
  @UseInterceptors(FileInterceptor('user[profile_img]', storage)) // formData의 key값
  async update(
    @Body('user') userUpdateDto: UserUpdateDto,
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

  @ApiOperation({ summary: '빌링키 발급받기' })
  @ApiResponse({
    status: 200,
    description: 'get billingkey success',
  })
  @Post('/billing')
  async getBillingKey(@Body() body: BillingKeyProps) {
    return this.usersService.getBillingKey(body);
  }

  @ApiOperation({ summary: '빌링결제 진행' })
  @ApiResponse({
    status: 200,
    description: 'make payment success',
  })
  @Post('/payment')
  async createPayment(@Body() body: TotalChargeProps) {
    return this.usersService.createPayment(body);
  }
}
