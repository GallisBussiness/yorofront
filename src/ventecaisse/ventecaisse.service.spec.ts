import { Test, TestingModule } from '@nestjs/testing';
import { VentecaisseService } from './ventecaisse.service';

describe('VentecaisseService', () => {
  let service: VentecaisseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VentecaisseService],
    }).compile();

    service = module.get<VentecaisseService>(VentecaisseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
