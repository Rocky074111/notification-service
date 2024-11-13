import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set up the microservice to listen for Redis events
  const microserviceOptions: MicroserviceOptions = {
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379
    },
  };

  // Enable the microservice
  app.connectMicroservice(microserviceOptions);

  await app.startAllMicroservices();
  await app.listen(3002, () => {
    Logger.log('Notification service is running on http://localhost:3002');
  });
}

bootstrap();
