import { HttpExceptionFilter } from '@filters/http-exception.filter';
import { NestFactory, Reflector } from '@nestjs/core';
import * as config from 'config';
import * as csrf from 'csurf';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as helmet from 'helmet';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import express from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.enableCors({
    origin: true,
    credentials: true,
  });

  const port = process.env.PORT || 3000;

  // app.use(helmet());
  app.use(cookieParser());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Convert exceptions to JSON readable format
  // console.log(JSON.parse(process.env.JWKS));

  // api setting
  const config = new DocumentBuilder()
    .setTitle('BackpackBus API')
    .setDescription('BackpackBus 개발을 위한 API 문서')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(passport.initialize());

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
