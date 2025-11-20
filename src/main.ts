import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './utils/http-filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

const logger = new Logger('Main');
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configuration CORS pour Better Auth - DOIT être avant tout autre middleware
  app.enableCors({
    origin: process.env.APP_URL || 'http://localhost:3000',
    credentials: true, // CRUCIAL pour les cookies Better Auth
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'X-Requested-With'],
    exposedHeaders: ['Set-Cookie'],
  });
  const uploadsPath = join(process.cwd(), 'uploads');
  app.useStaticAssets(uploadsPath, {
    prefix: '/uploads/',
    setHeaders: (res, path, stat) => {
      res.set('Access-Control-Allow-Origin', process.env.APP_URL);
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization,Credentials");
    }
  });
  
  // Configuration Helmet pour permettre les cookies
  app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: process.env.NODE_ENV == 'production',
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  const config = app.get(ConfigService);
  const conf = new DocumentBuilder()
  .setTitle('SASS COMMERCIAL')
  .setDescription('SASS COM API')
  .setVersion('1.0')
  .addTag('com')
  .build();
const document = SwaggerModule.createDocument(app, conf);
SwaggerModule.setup('api', app, document);
  const port = parseInt(config.get('NEST_PORT'), 10) || process.env.PORT;
  await app.listen(port, () => logger.log(`App started at port: ${port}`));
}
bootstrap();
