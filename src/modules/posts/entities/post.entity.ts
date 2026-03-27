import { UserEntity } from 'src/modules/users/entities/user.entity';

export class PostEntity {
  id: string;
  title: string;
  description?: string;
  code: string;
  language: string;
  authorId: string;
  author: UserEntity;
  createdAt: Date;
  updatedAt: Date;
}
