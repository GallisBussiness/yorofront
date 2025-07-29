import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './utils/http-filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { toNodeHandler } from 'better-auth/node';
import { auth } from 'lib/auth';
// import { AuthGuard } from './utils/auth.guard';

const logger = new Logger('Main');
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const uploadsPath = join(process.cwd(), 'uploads');
  app.useStaticAssets(uploadsPath, {
    prefix: '/uploads/',
    setHeaders: (res, path, stat) => {
      res.set('Access-Control-Allow-Origin', process.env.APP_URL);
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization,Credentials");
    }
  });
  app.use(helmet());
  app.enableCors({
    origin: process.env.APP_URL,
    methods: ["*"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  });
  // app.useGlobalGuards(new AuthGuard());
  const expressApp = app.getHttpAdapter().getInstance();
  // Mount BetterAuth handler directly on Express
  expressApp.all('/api/auth/*', toNodeHandler(auth));
  // app.useBodyParser('json');
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
