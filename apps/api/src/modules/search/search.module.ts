import { Module, OnModuleInit } from '@nestjs/common';
import { SearchService } from './services/search.service';
import { ElasticsearchModule, ElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SearchSyncService } from './services/search-sync.service';
import { PrismaService } from 'apps/api/src/common/services/prisma/prisma.service';
import { PostsModule } from '../posts/posts.module';
import { POST_SEARCH_INDEX, PostsIndexMapping } from './consts/post-search.index';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          node: configService.getOrThrow('ELASTICSEARCH_NODE'),
        };
      },
      inject: [ConfigService],
    }),
    PostsModule,
  ],
  providers: [SearchService, SearchSyncService, PrismaService],
})
export class SearchModule implements OnModuleInit {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}
  async onModuleInit() {
    const exists = await this.elasticsearchService.indices.exists({ index: POST_SEARCH_INDEX });
    if (!exists) {
      await this.elasticsearchService.indices.create({
        index: POST_SEARCH_INDEX,
        ...PostsIndexMapping,
      });
    }
  }
}
