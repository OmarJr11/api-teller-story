import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();
export const myDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['src/models/*.ts'],
  logging: true,
  synchronize: true
});
