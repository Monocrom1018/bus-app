import { CategoriesService } from './../categories/categories.service';
import { CategoriesRepository } from './../categories/categories.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './../users/users.repository';
import { UsersService } from './../users/users.service';
import { Module } from '@nestjs/common';
import { ObjectsService } from './objects.service';
import { ObjectsController } from './objects.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository, CategoriesRepository])],
  controllers: [ObjectsController],
  // Provider 의 역할은 Controller 외에 Service, Repository, Factory, Helper 등의 Dependency를 Nest Core가 Register 할 수 있도록 등록하는 곳
  providers: [ObjectsService, UsersService, CategoriesService],
})
export class ObjectsModule {}
