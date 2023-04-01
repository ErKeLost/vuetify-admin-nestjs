import { ConfigEnum } from './src/enum/config.enum';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './src/user/entities/user.entity';
import { Logs } from './src/logs/entities/logs.entity';
import { Profile } from './src/user/entities/profile.entity';
import { Roles } from './src/roles/entities/roles.entity';
import * as fs from 'node:fs';

import * as dotenv from 'dotenv';
// 通过环境变量读取不同的 env 文件

function getEnv(env: string): Record<string, unknown> {
  if (fs.existsSync(env)) {
    return dotenv.parse(fs.readFileSync(env));
  }
  return {};
}
// 通过 dotenv 解析不同的配置文件

function buildConnectOptions() {
  const defaultEnv = getEnv('.env');
  const envConfig = getEnv(`.env.${process.env.NODE_ENV || 'development'}`);
  // configService
  const config = { ...defaultEnv, ...envConfig };

  const entitiesDir =
    process.env.NODE_ENV === 'development'
      ? [__dirname + '/**/*.entity.ts']
      : [__dirname + '/**/*.entity{.ts,.js}'];

  return {
    type: config[ConfigEnum.DB],
    host: config[ConfigEnum.DB_HOST],
    port: config[ConfigEnum.DB_PORT],
    username: config[ConfigEnum.DB_USERNAME],
    password: config[ConfigEnum.DB_PASSWORD],
    database: config[ConfigEnum.DB_DATABASE],
    // entities: entitiesDir,
    entities: [User, Logs, Profile, Roles],
    // 同步本地schema与数据库 -> 每次初始化的时候同步
    synchronize: config[ConfigEnum.DB_SYNCHRONIZE],
    // logging: ['error'],
    logging: false,
    // logging: process.env.NODE_ENV === 'development' ? ['error'] : true,
  } as TypeOrmModuleOptions;
}
const connectOptions = buildConnectOptions();

export { connectOptions };
export default new DataSource({
  ...connectOptions,
  migrations: ['src/migrations/**'],
  subscribers: [],
} as DataSourceOptions);
