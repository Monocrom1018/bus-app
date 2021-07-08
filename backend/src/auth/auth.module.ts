import { UsersRepository } from '../users/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwkStrategy } from './strategies/jwk.strategy';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Global()
@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([UsersRepository])],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService, PassportModule],
})
export class AuthModule {}
