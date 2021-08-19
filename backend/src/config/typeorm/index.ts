import { ConnectionOptions } from 'typeorm';
import {
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_DATABASE,
  DB_PASSWORD,
} from '@environments';

export const typeormOptions: ConnectionOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  entities: [`${__dirname}/../../**/*.entity.{js,ts}`],
  synchronize: false,
};
