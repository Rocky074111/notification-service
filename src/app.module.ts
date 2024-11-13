import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotificationController } from './notification.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'REDIS_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'localhost', // Replace with your Redis host if different
          port: 6379,       // Replace with your Redis port if different
        },
      },
    ]),
  ],
  controllers: [NotificationController],
})
export class AppModule {}
