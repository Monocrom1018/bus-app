import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '@users/users.entity';
import { FilesEntity } from './files.entity';
import { FilesRepository } from './files.repository';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FilesRepository)
    private readonly filesRepository: FilesRepository,
  ) {}

  async saveFiles(user: UsersEntity, files: any) {
    this.filesRepository.saveFiles(user, files);
  }

  async updateFiles(user, files) {}
}
