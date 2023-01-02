import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  // forRoot 读取 .env 文件
  imports: [
    ConfigModule.forRoot({
      // 全局模块都能使用 不然只有app模块可以使用
      isGlobal: true,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
