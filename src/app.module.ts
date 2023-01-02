import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
// import * as dotenv from 'dotenv';
import configuration from './configuration';
// env 模式
// const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`;
@Module({
  // forRoot 读取 .env 文件
  imports: [
    ConfigModule.forRoot({
      // 全局模块都能使用 不然只有app模块可以使用
      isGlobal: true,
      // envFilePath,
      // load: [() => dotenv.config({ path: 'env' })],
      load: [() => configuration],
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
