import { Test, TestingModule } from '@nestjs/testing';
import { SearchSyncService } from './search-sync.service';

describe('SearchSyncService', () => {
  let service: SearchSyncService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchSyncService],
    }).compile();

    service = module.get<SearchSyncService>(SearchSyncService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
