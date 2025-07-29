import { Test, TestingModule } from '@nestjs/testing';
import { PaiementFournisseurController } from './paiement-fournisseur.controller';
import { PaiementFournisseurService } from './paiement-fournisseur.service';

describe('PaiementFournisseurController', () => {
  let controller: PaiementFournisseurController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaiementFournisseurController],
      providers: [PaiementFournisseurService],
    }).compile();

    controller = module.get<PaiementFournisseurController>(PaiementFournisseurController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
