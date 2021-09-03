import { UsersEntity } from '@users/users.entity';
import { EntityRepository, Repository } from 'typeorm';
import { FilesEntity } from './files.entity';

@EntityRepository(FilesEntity)
export class FilesRepository extends Repository<FilesEntity> {
  async saveFiles(user: UsersEntity, files: any) {
    // eslint-disable-next-line array-callback-return
    files.map((file) => {
      const { fileName, key } = file;
      const newFile = new FilesEntity();
      newFile.user = user;
      newFile.key = key;
      newFile.name = fileName;
      newFile.save();
    });
  }
}
