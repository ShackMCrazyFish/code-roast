import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength, Matches, IsOptional, IsNumber, IsUrl } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    description: 'The email of the user',
    example: 'test@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    description: 'The username of the user',
    example: 'testuser',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9_]+$/)
  username: string;

  @ApiProperty({
    required: true,
    description: 'The password of the user',
    example: 'password',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;

  @ApiProperty({
    required: false,
    description: 'The name of the user',
    example: 'Test User',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @IsOptional()
  name?: string;

  @ApiProperty({
    required: false,
    description: 'The bio of the user',
    example: 'I am a software engineer',
  })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiProperty({
    required: false,
    description: 'The GitHub ID of the user',
    example: 1234567890,
  })
  @IsNumber()
  @IsOptional()
  githubId?: number;

  @ApiProperty({
    required: false,
    description: 'The GitHub URL of the user',
    example: 'https://github.com/testuser',
  })
  @IsString()
  @IsOptional()
  @IsUrl()
  githubUrl?: string;
}
