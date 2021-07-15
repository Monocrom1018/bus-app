import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { UsersService } from '../users/users.service';
import { ObjectsService } from './objects.service';
import { ObjectsController } from './objects.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository])],
  controllers: [ObjectsController],
  // Provider 의 역할은 Controller 외에 Service, Repository, Factory, Helper 등의 Dependency를 Nest Core가 Register 할 수 있도록 등록하는 곳
  providers: [ObjectsService, UsersService],
})
export class ObjectsModule {}
