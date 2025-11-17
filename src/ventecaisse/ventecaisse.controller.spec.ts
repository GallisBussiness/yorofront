import { Test, TestingModule } from '@nestjs/testing';
import { VentecaisseController } from './ventecaisse.controller';
import { VentecaisseService } from './ventecaisse.service';

describe('VentecaisseController', () => {
  let controller: VentecaisseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VentecaisseController],
      providers: [VentecaisseService],
    }).compile();

    controller = module.get<VentecaisseController>(VentecaisseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
