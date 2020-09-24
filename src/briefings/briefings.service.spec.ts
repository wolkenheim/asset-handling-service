import { Test, TestingModule } from '@nestjs/testing';
import { BriefingsService } from './briefings.service';

describe('BriefingsService', () => {
  let service: BriefingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BriefingsService],
    }).compile();

    service = module.get<BriefingsService>(BriefingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
