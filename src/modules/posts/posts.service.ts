import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { Post } from 'src/generated/prisma/client';
import { PostEntity } from './entities/post.entity';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: UserEntity, dto: CreatePostDto): Promise<PostEntity> {
    const newPost = await this.prisma.post.create({
      data: {
        title: dto.title,
        description: dto.description,
        code: dto.code,
        language: dto.language,
        authorId: user.id,
      },
    });

    return this.toEntity(newPost);
  }

  async findAll(): Promise<PostEntity[]> {
    const posts = await this.prisma.post.findMany({
      include: {
        author: true,
      },
    });

    return posts.map((post) => this.toEntity(post));
  }

  async findOne(id: string): Promise<PostEntity> {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return this.toEntity(post);
  }

  async update(id: string, dto: UpdatePostDto): Promise<PostEntity> {
    const updatedPost = await this.prisma.post.update({
      where: { id },
      data: {
        title: dto.title,
        description: dto.description,
        code: dto.code,
        language: dto.language,
      },
    });

    if (!updatedPost) {
      throw new NotFoundException('Post not found');
    }

    return this.toEntity(updatedPost);
  }

  async remove(id: string): Promise<void> {
    await this.prisma.post.delete({
      where: { id },
    });
  }

  private toEntity(post: Post): PostEntity {
    return plainToInstance(PostEntity, post);
  }
}
