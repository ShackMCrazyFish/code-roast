import { Exclude, Transform } from 'class-transformer';

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

  @Transform(({ value }: { value: Date }) => value.toISOString())
  createdAt: Date;

  @Transform(({ value }: { value: Date }) => value.toISOString())
  updatedAt: Date;

  @Transform(({ value }: { value: Date }) => value.toISOString())
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
