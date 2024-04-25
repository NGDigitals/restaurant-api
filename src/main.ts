import { AppModule } from './app.module';
import {NestFactory} from "@nestjs/core";
import {ValidationPipe} from "@nestjs/common";
import {setupSwaggerDocuments} from "./common/swagger";

import config from "./config/config";

const configureApp = (app: any) => {
  if (config.cors) {
    app.enableCors(config.cors);
  }
  app.setGlobalPrefix(`${config.context_path}`);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    }),
  );
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  configureApp(app);
  setupSwaggerDocuments(app);
  await app.listen(`${config.port}`)
}

bootstrap();
