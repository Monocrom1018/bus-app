import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AdminUsersController } from './adminUsers.controller';
import { AdminUsersService } from './adminUsers.service';
import { AdminUsersRepository } from './adminUsers.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AdminUsersRepository])],
  controllers: [AdminUsersController],
  providers: [AdminUsersService],
})
export class AdminUsersModule {}
