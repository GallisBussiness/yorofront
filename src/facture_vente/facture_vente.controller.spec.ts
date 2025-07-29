import { Test, TestingModule } from '@nestjs/testing';
import { FactureVenteController } from './facture_vente.controller';
import { FactureVenteService } from './facture_vente.service';

describe('FactureVenteController', () => {
  let controller: FactureVenteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FactureVenteController],
      providers: [FactureVenteService],
    }).compile();

    controller = module.get<FactureVenteController>(FactureVenteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
