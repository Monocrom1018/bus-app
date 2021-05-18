import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { NestFactory, Reflector } from '@nestjs/core';
import * as config from 'config';
import * as csrf from 'csurf';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as helmet from 'helmet';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // const apiConfig = config.get('api');
  // app.setGlobalPrefix(apiConfig.version);
  // app.use(csurf({ cookie: true }));
  // app.use(csrf({ cookie: true })); // csrf 방어
  app.enableCors();
  app.use(helmet());
  app.use(cookieParser());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  // Validate query params and body
  // app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Convert exceptions to JSON readable format
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(80);
}
bootstrap();
