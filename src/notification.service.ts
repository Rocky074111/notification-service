// src/notification.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  @EventPattern('user_created')
  handleUserCreatedEvent(data: any) {
    this.logger.log(`Sending welcome email to ${data.email}`);
    // Simulate email sending logic
  }
}
