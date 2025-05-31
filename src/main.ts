import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeedsService } from './seeds/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();
const seedService = app.get(SeedsService);
 await seedService.seedSuperAdmin();
  await app.listen(process.env.PORT ?? 4001);
}
bootstrap();
