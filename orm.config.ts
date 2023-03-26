import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './src/user/entities/user.entity';
import { Logs } from './src/logs/entities/logs.entity';
import { Profile } from './src/user/entities/profile.entity';
import { Roles } from './src/roles/entities/roles.entity';

const connectOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3080,
  username: 'root',
  password: 'example',
  database: 'testdb',
  // entities: [User, Logs, Profile, Roles],
  entities: [User, Logs, Profile, Roles],
  // 同步本地schema与数据库 -> 每次初始化的时候同步
  synchronize: true,
  // logging: ['error'],
  logging: false,
  // logging: process.env.NODE_ENV === 'development' ? ['error'] : true,
} as TypeOrmModuleOptions;

export { connectOptions };
export default new DataSource({
  ...connectOptions,
  migrations: 'src/migrations/**',
  subscribers: [],
} as unknown as DataSourceOptions);
