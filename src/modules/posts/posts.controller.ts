import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CurrentUser } from 'src/common/decorators/current-user/current-user.decorator';
import { UserEntity } from '../users/entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PostResponseDto } from './dto/post-response.dto';
import { plainToInstance } from 'class-transformer';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@CurrentUser() user: UserEntity, @Body() createPostDto: CreatePostDto): Promise<PostResponseDto> {
    const post = await this.postsService.create(user, createPostDto);
    return plainToInstance(PostResponseDto, post);
  }

  @Get()
  async findAll(): Promise<PostResponseDto[]> {
    const posts = await this.postsService.findAll();
    return plainToInstance(PostResponseDto, posts);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PostResponseDto> {
    const post = await this.postsService.findOne(id);
    return plainToInstance(PostResponseDto, post);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto): Promise<PostResponseDto> {
    const post = await this.postsService.update(id, updatePostDto);
    return plainToInstance(PostResponseDto, post);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.postsService.remove(id);
  }
}
