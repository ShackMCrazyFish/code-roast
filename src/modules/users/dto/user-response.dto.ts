import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class UserResponseDto {
  @ApiProperty({
    description: 'The ID of the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'The username of the user',
    example: 'testuser',
  })
  @Expose()
  username: string;

  @ApiProperty({
    description: 'The name of the user',
    example: 'Test User',
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'The avatar of the user',
    example: 'https://example.com/avatar.png',
  })
  @Expose()
  avatar: string;

  @ApiProperty({
    description: 'The bio of the user',
    example: 'I am a software engineer',
  })
  @Expose()
  bio: string;

  @ApiProperty({
    description: 'The reputation of the user',
    example: 100,
  })
  @Expose()
  reputation: number;

  @ApiProperty({
    description: 'The streak days of the user',
    example: 10,
  })
  @Expose()
  streakDays: number;

  @ApiProperty({
    description: 'The created at of the user',
    example: '2021-01-01T00:00:00.000Z',
  })
  @Expose()
  @Transform(({ value }: { value: Date }) => value.toISOString())
  createdAt: Date;

  @ApiProperty({
    description: 'The updated at of the user',
    example: '2021-01-01T00:00:00.000Z',
  })
  @Expose()
  @Transform(({ value }: { value: Date }) => value.toISOString())
  updatedAt: Date;

  @ApiProperty({
    description: 'The last active at of the user',
    example: '2021-01-01T00:00:00.000Z',
  })
  @Expose()
  @Transform(({ value }: { value: Date }) => value.toISOString())
  lastActiveAt: Date;

  @ApiProperty({
    description: 'Whether the user is a newbie',
    example: true,
  })
  @Expose()
  get isNewbie(): boolean {
    return this.reputation < 100;
  }

  @ApiProperty({
    description: 'The profile URL of the user',
    example: 'https://example.com/users/testuser',
  })
  @Expose()
  get profileUrl(): string {
    return `/users/${this.username}`;
  }
}
