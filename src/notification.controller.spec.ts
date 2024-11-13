import { Test, TestingModule } from '@nestjs/testing';
import { NotificationController } from './notification.controller';
import { Logger } from '@nestjs/common';

describe('NotificationController', () => {
  let controller: NotificationController;
  let logger: Logger;

  const mockUser = {
    id: 123,
    name: 'John Doe',
    email: 'john.doe@example.com',
  };

  beforeEach(async () => {
    // Mock the logger to avoid actual console logs in the test output
    const loggerMock = {
      log: jest.fn(),
    };

    // Create the testing module
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationController],
      providers: [
        { provide: Logger, useValue: loggerMock },
      ],
    }).compile();

    controller = module.get<NotificationController>(NotificationController);
    logger = module.get<Logger>(Logger);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should handle user_created event and send a welcome email', async () => {
    // Spy on the logger log method
    const logSpy = jest.spyOn(logger, 'log');

    // Call the handleUserCreated method directly to simulate the event
    await controller.handleUserCreated(mockUser);

    // Ensure the logSpy is called with the correct message
    expect(logSpy).toHaveBeenCalledWith('Received event for new user creation: John Doe (john.doe@example.com)');
    expect(logSpy).toHaveBeenCalledWith('Sending welcome email to: john.doe@example.com');
  });

  it('should call the sendWelcomeEmail method', async () => {
    // Spy on the sendWelcomeEmail method to check if it's being called
    const sendWelcomeEmailSpy = jest.spyOn(controller as any, 'sendWelcomeEmail');

    // Call the handleUserCreated method to trigger sendWelcomeEmail
    await controller.handleUserCreated(mockUser);

    // Assert that the sendWelcomeEmail method was called with the correct user data
    expect(sendWelcomeEmailSpy).toHaveBeenCalledWith(mockUser);
  });
});
