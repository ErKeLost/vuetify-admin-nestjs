import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/exception/base-exception.filter';
import { HttpExceptionFilter } from './common/exception/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
async function bootstrap() {
  // 关闭整个nest日志
  // const app = await NestFactory.create(AppModule, { logger: false });
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());
  await app.listen(3000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
