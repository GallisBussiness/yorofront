import { Test, TestingModule } from '@nestjs/testing';
import { DetteController } from './dette.controller';
import { DetteService } from './dette.service';

describe('DetteController', () => {
  let controller: DetteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetteController],
      providers: [DetteService],
    }).compile();

    controller = module.get<DetteController>(DetteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
