import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  Res,
  Body,
  Post,
  UseGuards,
  Controller,
  ValidationPipe,
  Req,
  Param,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { JwtAuthGuard } from './jwt-auth-guard';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { randomBytes } from 'crypto';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @UseInterceptors(FileInterceptor('file'))
  async signUp(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @UploadedFile() file: Express.Multer.File,
    @Res({ passthrough: true }) response: Response,
  ) {
    response.cookie('jwt_access', 'jwt_access');
    response.cookie('value', 'tokens[:access]');
    response.cookie('httponly', true);
    response.cookie('secure', process.env.NODE_ENV === 'production');

    const csrfToken = randomBytes(32).toString('base64');
    // dto를 사전에 선언 데이터 객체를 넘긴다
    const accessToken = await this.authService.signUp(authCredentialsDto);

    return {
      csrf: csrfToken,
      token: accessToken,
    };
  }

  // @UseGuards(LocalAuthGuard)
  @Post('/login')
  @UseInterceptors(FileInterceptor('file'))
  async login(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const csrfToken = randomBytes(32).toString('base64');
    const accessToken = await this.authService.login(authCredentialsDto);

    return {
      csrf: csrfToken,
      token: accessToken,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('/token')
  token(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    const csrfToken = randomBytes(32).toString('base64');
    return csrfToken;
  }
}
