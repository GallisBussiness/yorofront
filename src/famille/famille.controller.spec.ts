import { Test, TestingModule } from '@nestjs/testing';
import { FamilleController } from './famille.controller';
import { FamilleService } from './famille.service';

describe('FamilleController', () => {
  let controller: FamilleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FamilleController],
      providers: [FamilleService],
    }).compile();

    controller = module.get<FamilleController>(FamilleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
