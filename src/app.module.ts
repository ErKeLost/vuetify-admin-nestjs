import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import configuration from './configuration';
import * as joi from 'joi';
// env 模式
const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`;

@Module({
  // forRoot 读取 .env 文件
  imports: [
    ConfigModule.forRoot({
      // 全局模块都能使用 不然只有app模块可以使用
      isGlobal: true,
      // envFilePath,
      load: [() => dotenv.config({ path: 'env' })],
      // load: [() => configuration],
      // 设置环境变量配置验证 joi 传递环境变量的格式校验
      // 环境变量使用枚举的方式来进行填充
      validationSchema: joi.object({
        DB_PORT: joi.number().default(3306),
        DB_URL: joi.string().domain(),
        DB_HOST: joi.string().ip(),
        NODE_ENV: joi.string().valid('development', 'production'),
      }),
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
