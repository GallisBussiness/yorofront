import { Test, TestingModule } from '@nestjs/testing';
import { FactureVenteService } from './facture_vente.service';

describe('FactureVenteService', () => {
  let service: FactureVenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FactureVenteService],
    }).compile();

    service = module.get<FactureVenteService>(FactureVenteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
