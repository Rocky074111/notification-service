import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller('notification')
export class NotificationController {
  private readonly logger = new Logger(NotificationController.name);

  // Listening for events with the pattern 'user_created'
  @EventPattern('user_created')
  async handleUserCreated(@Payload() user: { id: number; name: string; email: string }) {
    // Simulate sending a notification
    console.log(`Received event for new user creation: ${user.name} (${user.email})`); // Debug log

    this.logger.log(`Received event for new user creation: ${user.name} (${user.email})`);
   
    // Simulated notification logic (e.g., sending an email)
    this.sendWelcomeEmail(user);
  }

  private sendWelcomeEmail(user: { id: number; name: string; email: string }) {
    // Example simulation of sending an email
    this.logger.log(`Sending welcome email to: ${user.email}`);
    // In real applications, you would integrate with an email service here
  }
}
