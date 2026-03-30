import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserResponseDto } from 'apps/api/src/modules/users/dto/user-response.dto';

export class PostResponseDto {
  @ApiProperty({
    description: 'The ID of the post',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'The title of the post',
    example: 'Hello, world!',
  })
  @Expose()
  title: string;

  @ApiProperty({
    description: 'The description of the post',
    example: 'This is a description of the post',
  })
  @Expose()
  description: string;

  @ApiProperty({
    description: 'The code of the post',
    example: 'console.log("Hello, world!");',
  })
  @Expose()
  codeSnippet: string;

  @ApiProperty({
    description: 'The language of the post',
    example: 'javascript',
  })
  @Expose()
  language: string;

  @ApiProperty({
    description: 'The language of the post',
    example: 'javascript',
  })
  @Expose()
  authorId: string;

  @ApiProperty({
    description: 'The author of the post',
    example: {
      id: '123e4567-e89b-12d3-a456-426614174000',
      username: 'testuser',
      name: 'Test User',
      avatar: 'https://example.com/avatar.png',
      bio: 'I am a software engineer',
      reputation: 100,
    },
  })
  @Expose()
  author: UserResponseDto;

  @ApiProperty({
    description: 'The created at of the post',
    example: '2021-01-01T00:00:00.000Z',
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    description: 'The updated at of the post',
    example: '2021-01-01T00:00:00.000Z',
  })
  @Expose()
  updatedAt: Date;
}
