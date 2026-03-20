import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { RoastsModule } from './roasts/roasts.module';
import { CommentsModule } from './comments/comments.module';
import { TagsModule } from './tags/tags.module';
import { SearchModule } from './search/search.module';
import { FeedModule } from './feed/feed.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PostsModule,
    RoastsModule,
    CommentsModule,
    TagsModule,
    SearchModule,
    FeedModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
