import { UserEntity } from 'apps/api/src/modules/users/entities/user.entity';

export class PostEntity {
  id: string;
  title: string;
  description?: string;
  codeSnippet: string;
  language: string;
  authorId: string;
  author: UserEntity;
  createdAt: Date;
  updatedAt: Date;
}
