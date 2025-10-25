import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express = require('express');
const compression = require('compression');
const helmet = require('helmet');

let cachedServer: any;

async function bootstrapServer() {
  if (cachedServer) {
    return cachedServer;
  }

  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);

  const app = await NestFactory.create(AppModule, adapter, {
    logger: ['error', 'warn', 'log'],
  });

  // Security - Configure helmet to allow CDN for Swagger
  const helmetMiddleware = helmet.default || helmet;
  app.use(helmetMiddleware({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
        scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
        imgSrc: ["'self'", "data:", "https://validator.swagger.io"],
      },
    },
  }));
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
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'Spa Management API',
    customCss: '.swagger-ui .topbar { display: none }',
    customfavIcon: 'https://swagger.io/favicon.ico',
    swaggerOptions: {
      persistAuthorization: true,
    },
    customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui.min.css',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-standalone-preset.min.js',
    ],
  });

  await app.init();

  cachedServer = expressApp;
  return expressApp;
}

export default async (req: any, res: any) => {
  try {
    const server = await bootstrapServer();
    return server(req, res);
  } catch (error) {
    console.error('❌ Serverless function error:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message,
      stack: process.env.APP_ENV === 'development' ? error.stack : undefined,
    });
  }
};
