import { getRepository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CategoriesService } from '../categories/categories.service';
import { Injectable } from '@nestjs/common';
import { CreateObjectDto } from './dto/create-object.dto';
import { UpdateObjectDto } from './dto/update-object.dto';
import * as _ from 'lodash';
import * as pluralize from 'pluralize';
import * as ts from 'typescript';

@Injectable()
// IOC 제어의 역전
// Injectable 데코레이터를 통해 Singleton 의 Dependency가 생기게 되는데
// Controller 에 존재했던 로직을 Service 영역으로 책임과 역할을 수행하도록 로직을 옮겼다
export class ObjectsService {
  constructor(
    private userService: UsersService,
    private categoriesService: CategoriesService,
  ) {}

  create(createObjectDto: CreateObjectDto) {
    return 'This action adds a new object';
  }

  findAll() {
    return `This action returns all objects`;
  }

  findOne(id: number) {
    return `This action returns a #${id} object`;
  }

  update(id: number, updateObjectDto: UpdateObjectDto) {
    return `This action updates a #${id} object`;
  }

  remove(id: number) {
    return `This action removes a #${id} object`;
  }

  async getModel(query: any): Promise<any> {
    let model = {};
    if (query.model_name) {
      const modelService =
        pluralize(_.capitalize(query.model_name)) + 'Service';
      if (modelService === UsersService.name) {
        model = await this.userService.findAll();
      } else if (modelService === CategoriesService.name) {
        model = await this.categoriesService.findAll();
      }
    }
    console.log(model);
    return { objects: model };
  }
}
