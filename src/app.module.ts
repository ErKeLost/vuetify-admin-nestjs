import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
// import configuration from './configuration';
import * as joi from 'joi';
import { LoggerModule } from 'nestjs-pino';
import { join } from 'path';
import ormConfig from 'orm.config';

// env 模式
// const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`;
// console.log(configuration);
const logger = {
  // pinoHttp: {
  //   transport:
  //     process.env.NODE_ENV === 'development'
  //       ? {
  //           target: 'pino-pretty',
  //           options: {
  //             colorize: true,
  //           },
  //         }
  //       : {
  //           target: 'pino-roll',
  //           options: {
  //             file: path.join('log', 'log.txt'),
  //             frequency: 'daily', //hourly
  //             size: '100m',
  //             mkdir: true,
  //           },
  //         },
  // },
  pinoHttp: {
    transport: {
      targets: [
        {
          level: 'info',
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        },
        {
          level: 'info',
          target: 'pino-roll',
          options: {
            file: join(process.cwd(), 'logs/log.txt'),
            frequency: 'daily', //hourly
            size: '100m',
            mkdir: true,
          },
        },
      ],
    },
  },
};
@Module({
  // forRoot 读取 .env 文件
  imports: [
    LoggerModule.forRoot(logger),
    ConfigModule.forRoot({
      // 全局模块都能使用 不然只有app模块可以使用
      isGlobal: true,
      // envFilePath,
      load: [() => dotenv.config({ path: 'env' })],
      // load: [() => configuration],
      // load: [configuration],
      // 设置环境变量配置验证 joi 传递环境变量的格式校验
      // 环境变量使用枚举的方式来进行填充
      validationSchema: joi.object({
        DB_PORT: joi.number().default(3306),
        // DB_HOST: joi.string().ip(),
        NODE_ENV: joi.string().valid('development', 'production'),
        DB: joi.string().valid('mysql', 'postgres'),
        DB_DATABASE: joi.string().required(),
        DB_USERNAME: joi.string().required(),
        DB_PASSWORD: joi.string().required(),
        DB_SYNCHRONIZE: joi.boolean().default(false),
      }),
    }),
    TypeOrmModule.forRoot(ormConfig),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
