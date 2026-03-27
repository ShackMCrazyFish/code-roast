import { Exclude } from 'class-transformer';

export class UserEntity {
  id: string;
  email: string;
  username: string;
  passwordHash: string;
  name: string;
  avatar: string;
  githubUrl: string;
  bio: string;
  reputation: number;
  streakDays: number;

  @Exclude()
  githubId: number;

  createdAt: Date;
  updatedAt: Date;
  lastActiveAt: Date;

  get isNewbie(): boolean {
    return this.reputation < 100;
  }

  get profileUrl(): string {
    return `/users/${this.username}`;
  }

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
