import { getRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import * as pluralize from 'pluralize';
import * as ts from 'typescript';
import { UpdateObjectDto } from './dto/update-object.dto';
import { CreateObjectDto } from './dto/create-object.dto';
import { UsersService } from '../users/users.service';

@Injectable()
// IOC 제어의 역전
// Injectable 데코레이터를 통해 Singleton 의 Dependency가 생기게 되는데
// Controller 에 존재했던 로직을 Service 영역으로 책임과 역할을 수행하도록 로직을 옮겼다
export class ObjectsService {
  constructor(private userService: UsersService) {}

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
      const modelService = `${pluralize(
        _.capitalize(query.model_name),
      )}Service`;
      if (modelService === UsersService.name) {
        model = await this.userService.findAll();
      }
    }
    return { objects: model };
  }
}
