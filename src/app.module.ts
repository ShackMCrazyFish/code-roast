import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { RoastsModule } from './modules/roasts/roasts.module';
import { CommentsModule } from './modules/comments/comments.module';
import { TagsModule } from './modules/tags/tags.module';
import { SearchModule } from './modules/search/search.module';
import { FeedModule } from './modules/feed/feed.module';
import { NotificationModule } from './modules/notification/notification.module';

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
