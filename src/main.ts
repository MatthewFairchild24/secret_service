import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express'
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  app.use('/uploads', express.static('/backend/uploads'))

  app.use((req, res, next) => {
    console.log('REQ:', req.url);
    next();
  });

  app.enableCors()

  await app.listen(process.env.PORT ?? 8000, '0.0.0.0');


}
bootstrap();
