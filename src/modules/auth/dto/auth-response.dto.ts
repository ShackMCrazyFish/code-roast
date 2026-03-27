import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AuthResponseDto {
  @ApiProperty({
    description: 'The access token',
  })
  @Expose()
  accessToken: string;
}
