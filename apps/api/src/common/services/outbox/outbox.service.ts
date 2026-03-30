import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'apps/api/src/common/services/prisma/prisma.service';

@Injectable()
export class OutboxService {
  private readonly logger = new Logger(OutboxService.name);

  constructor(private readonly prisma: PrismaService) {}

  async publish(topic: string, payload: any): Promise<void> {
    try {
      await this.prisma.outboxEvent.create({
        data: { topic, payload: JSON.stringify(payload) },
      });
    } catch (error) {
      this.logger.error('Failed to publish event:', error);
      throw error;
    }
  }
}
