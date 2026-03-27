import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { PostsService } from 'src/modules/posts/posts.service';
import { POST_SEARCH_INDEX } from '../consts/post-search.index';
import { OutboxEvent } from 'src/generated/prisma/client';
import { Cron } from '@nestjs/schedule';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchSyncService {
  private readonly logger = new Logger(SearchSyncService.name);

  constructor(
    private readonly esService: ElasticsearchService,
    private readonly prisma: PrismaService,
    private readonly postsService: PostsService,
  ) {}

  @Cron('*/5 * * * * *') // Каждые 5 секунд
  async processOutbox() {
    const events = await this.prisma.outboxEvent.findMany({
      where: {
        processed: false,
      },
      take: 50,
    });

    for (const event of events) {
      try {
        await this.handleEvent(event);

        // Помечаем как обработанное
        await this.prisma.outboxEvent.update({
          where: { id: event.id },
          data: { processed: true },
        });
        this.logger.log(`Event ${event.id} processed successfully`);
      } catch (error) {
        this.logger.error(`Error processing event ${event.id}: ${error}`);
        // В продакшене: логировать ошибку в payload или считать retry_count
      }
    }
  }

  private async handleEvent(event: OutboxEvent) {
    const { postId } = event.payload as { postId: string };
    switch (event.topic) {
      case 'POST_CREATED':
      case 'POST_UPDATED': {
        const post = await this.postsService.findOne(postId);
        if (!post) return;

        try {
          await this.esService.index({
            index: POST_SEARCH_INDEX,
            id: postId,
            document: {
              postId: post.id,
              authorId: post.authorId,
              author: post.author,
              title: post.title,
              language: post.language,
              createdAt: post.createdAt,
            },
          });
        } catch (error) {
          this.logger.error(`Error indexing post ${postId}: ${error}`);
          throw error;
        }
        break;
      }

      case 'POST_DELETED':
        await this.esService.delete({
          index: POST_SEARCH_INDEX,
          id: postId,
        });
        break;
      default:
        throw new Error(`Unsupported event topic: ${event.topic}`);
    }
  }
}
