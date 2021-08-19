import * as dotenv from 'dotenv';

dotenv.config();

const STATIC: string = process.env.STATIC || 'static';

const DB_HOST: string = process.env.DB_HOST || 'localhost';
const DB_PORT: number = +process.env.DB_PORT || 5432;
const DB_USERNAME: string = process.env.DB_USERNAME || 'root';
const DB_DATABASE: string = process.env.DB_DATABASE || '';
const DB_PASSWORD: string = process.env.DB_PASSWORD || '1234';

export { STATIC, DB_HOST, DB_PORT, DB_USERNAME, DB_DATABASE, DB_PASSWORD };
