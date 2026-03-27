import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { RoastsModule } from './modules/roasts/roasts.module';
import { CommentsModule } from './modules/comments/comments.module';
import { TagsModule } from './modules/tags/tags.module';
import { SearchModule } from './modules/search/search.module';
import { FeedModule } from './modules/feed/feed.module';
import { NotificationModule } from './modules/notification/notification.module';
import { PrismaService } from './prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
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
  providers: [PrismaService],
})
export class AppModule {}
