import { Test, TestingModule } from '@nestjs/testing';
import { PaiementFournisseurService } from './paiement-fournisseur.service';

describe('PaiementFournisseurService', () => {
  let service: PaiementFournisseurService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaiementFournisseurService],
    }).compile();

    service = module.get<PaiementFournisseurService>(PaiementFournisseurService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
