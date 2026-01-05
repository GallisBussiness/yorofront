import { Test, TestingModule } from '@nestjs/testing';
import { PaiementDetteFournisseurService } from './paiement-dette-fournisseur.service';

describe('PaiementDetteFournisseurService', () => {
  let service: PaiementDetteFournisseurService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaiementDetteFournisseurService],
    }).compile();

    service = module.get<PaiementDetteFournisseurService>(PaiementDetteFournisseurService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
