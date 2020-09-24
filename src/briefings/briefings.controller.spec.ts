import { Test, TestingModule } from '@nestjs/testing';
import { BriefingsController } from './briefings.controller';

describe('BriefingsController', () => {
  let controller: BriefingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BriefingsController],
    }).compile();

    controller = module.get<BriefingsController>(BriefingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
