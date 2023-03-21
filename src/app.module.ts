import { ConfigEnum } from './enum/config.enum';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import configuration from './configuration';
import * as joi from 'joi';
// env 模式
// const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`;
// console.log(configuration);

@Module({
  // forRoot 读取 .env 文件
  imports: [
    ConfigModule.forRoot({
      // 全局模块都能使用 不然只有app模块可以使用
      isGlobal: true,
      // envFilePath,
      // load: [() => dotenv.config({ path: 'env' })],
      // load: [() => configuration],
      load: [configuration],
      // 设置环境变量配置验证 joi 传递环境变量的格式校验
      // 环境变量使用枚举的方式来进行填充
      validationSchema: joi.object({
        DB_PORT: joi.number().default(3306),
        DB_HOST: joi.string().ip(),
        NODE_ENV: joi.string().valid('development', 'production'),
        DB: joi.string().valid('mysql', 'postgres'),
        DB_DATABASE: joi.string().required(),
        DB_USERNAME: joi.string().required(),
        DB_PASSWORD: joi.string().required(),
        DB_SYNCHRONIZE: joi.boolean().default(false),
      }),
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3080,
    //   username: 'root',
    //   password: 'example',
    //   database: 'testdb',
    //   entities: [],
    //   // 同步本地schema与数据库 -> 每次初始化的时候同步
    //   synchronize: true,
    //   logging: ['error', 'warn', 'info', 'log'],
    // }),
    // 不能写死 要读取环境变量
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const DB = configService.get(ConfigEnum.DB_NAME);
        return {
          type: DB[ConfigEnum.DB],
          host: DB(ConfigEnum.DB_HOST),
          port: DB(ConfigEnum.DB_PORT),
          username: DB(ConfigEnum.DB_USERNAME),
          password: DB(ConfigEnum.DB_PASSWORD),
          database: DB(ConfigEnum.DB_DATABASE),
          entities: [],
          // 同步本地schema与数据库 -> 每次初始化的时候同步
          synchronize: DB(ConfigEnum.DB_SYNCHRONIZE),
          logging: ['error', 'warn', 'info', 'log'],
        } as TypeOrmModuleOptions;
      },
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
