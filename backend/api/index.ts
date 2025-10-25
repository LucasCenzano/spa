import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express = require('express');
const compression = require('compression');
const helmet = require('helmet');

const expressApp = express();

async function createNestServer(expressInstance: any) {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  // Security
  app.use(helmet.default ? helmet.default() : helmet());
  app.use(compression());

  // CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true,
  });

  // Global prefix
  app.setGlobalPrefix('api');

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('Spa Management API')
    .setDescription('API completa para sistema de gestión de spa')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Autenticación y usuarios')
    .addTag('services', 'Servicios del spa')
    .addTag('bookings', 'Reservas')
    .addTag('reviews', 'Reseñas')
    .addTag('employees', 'Gestión de empleados')
    .addTag('admin', 'Administración')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.init();

  return app;
}

createNestServer(expressApp)
  .then(() => console.log('Nest Ready'))
  .catch((err) => console.error('Nest broken', err));

export default expressApp;
