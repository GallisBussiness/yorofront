import { Test, TestingModule } from '@nestjs/testing';
import { PaiementDetteFournisseurController } from './paiement-dette-fournisseur.controller';
import { PaiementDetteFournisseurService } from './paiement-dette-fournisseur.service';

describe('PaiementDetteFournisseurController', () => {
  let controller: PaiementDetteFournisseurController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaiementDetteFournisseurController],
      providers: [PaiementDetteFournisseurService],
    }).compile();

    controller = module.get<PaiementDetteFournisseurController>(PaiementDetteFournisseurController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
